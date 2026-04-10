"use client";

import { gsap } from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";

import { heroCodePythonString } from "../../data/heroCodePython";

const ROTATING_TITLES = [
  "FULLSTACK DEVELOPER",
  "PRODUCT MINDED DEVELOPER",
  "BACKEND SPECIALIST",
  "DEVOPS ENTHUSIAST",
];

type Token = { text: string; color: string };

type TokenProgress = { clip: number };

type LetterProgress = { y: number; opacity: number };

function wrapText(charWidth: number, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  const charsPerLine = Math.max(1, Math.floor(maxWidth / charWidth));
  let i = 0;
  while (i < text.length) {
    lines.push(text.slice(i, i + charsPerLine));
    i += charsPerLine;
  }
  return lines;
}

const PY_KEYWORDS = new Set([
  "False",
  "None",
  "True",
  "and",
  "as",
  "assert",
  "async",
  "await",
  "break",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "finally",
  "for",
  "from",
  "global",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "nonlocal",
  "not",
  "or",
  "pass",
  "raise",
  "return",
  "try",
  "while",
  "with",
  "yield",
]);

const PY_BUILTINS = new Set([
  "print",
  "range",
  "len",
  "sorted",
  "str",
  "int",
  "float",
  "dict",
  "list",
  "set",
  "tuple",
  "map",
  "filter",
  "sum",
  "min",
  "max",
  "any",
  "all",
]);

function tokenizeLine(line: string, dim: boolean, isDark: boolean): Token[] {
  const tokens: Token[] = [];
  const alpha = dim ? "90" : "ff";

  const cKeyword = `${isDark ? "#cba6f7" : "#8839ef"}${alpha}`;
  const cString = `${isDark ? "#a6e3a1" : "#40a02b"}${alpha}`;
  const cType = `${isDark ? "#f9e2af" : "#df8e1d"}${alpha}`;
  const cNumber = `${isDark ? "#fab387" : "#fe640b"}${alpha}`;
  const cPunct = `${isDark ? "#6c7086" : "#9ca0b0"}${alpha}`;
  const cBuiltin = `${isDark ? "#89b4fa" : "#1e66f5"}${alpha}`;
  const cDefault = `${isDark ? "#cdd6f4" : "#4c4f69"}${alpha}`;
  const cComment = `${isDark ? "#45475a" : "#acafbe"}${alpha}`;

  let i = 0;
  while (i < line.length) {
    if (line[i] === "#") {
      tokens.push({ text: line.slice(i), color: cComment });
      break;
    }

    if (line[i] === "'" || line[i] === '"') {
      const quote = line[i]!;
      let j = i + 1;
      while (j < line.length && line[j] !== quote) j++;
      tokens.push({ text: line.slice(i, Math.min(j + 1, line.length)), color: cString });
      i = j + 1;
      continue;
    }

    if (/\d/.test(line[i]!) && (i === 0 || /[^a-zA-Z_]/.test(line[i - 1]!))) {
      let j = i;
      while (j < line.length && /[\d._]/.test(line[j]!)) j++;
      tokens.push({ text: line.slice(i, j), color: cNumber });
      i = j;
      continue;
    }

    if (/[a-zA-Z_]/.test(line[i]!)) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_]/.test(line[j]!)) j++;
      const word = line.slice(i, j);
      let color = cDefault;
      if (PY_KEYWORDS.has(word)) color = cKeyword;
      else if (PY_BUILTINS.has(word)) color = cBuiltin;
      else if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) color = cType;
      tokens.push({ text: word, color });
      i = j;
      continue;
    }

    if (/[{}()[\];:.,<>=!&|?+\-*/%@#~^\\]/.test(line[i]!)) {
      let j = i;
      while (j < line.length && /[{}()[\];:.,<>=!&|?+\-*/%@#~^\\]/.test(line[j]!)) j++;
      tokens.push({ text: line.slice(i, j), color: cPunct });
      i = j;
      continue;
    }

    let j = i;
    while (j < line.length && !/[a-zA-Z_0-9'"{}()[\];:.,<>=!&|?+\-*/%@#~^\\\d#]/.test(line[j]!)) j++;
    if (j === i) j = i + 1;
    tokens.push({ text: line.slice(i, j), color: cDefault });
    i = j;
  }

  return tokens;
}

export function HeroCodeBackground() {
  const dimCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const brightCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const hoverCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const solidCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const NAME_TEXT = "YONATAN ASSEFA";
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const SUB_TEXT = ROTATING_TITLES[currentTitleIndex];
  const maxSubLength = Math.max(...ROTATING_TITLES.map(t => t.length));

  const allLetters = useMemo(() => [...NAME_TEXT, ...Array.from({ length: maxSubLength }, () => "X")], [maxSubLength]);
  const letterProgress = useRef<LetterProgress[]>(allLetters.map(() => ({ y: 1, opacity: 0 })));

  const scrollOffset = useRef(0);
  const cachedLines = useRef<string[]>([]);
  const cachedDimTokens = useRef<Token[][]>([]);
  const tokenProgress = useRef<TokenProgress[]>([]);
  const tokenShuffledIndices = useRef<number[]>([]);
  const tokenFlatStartPerLine = useRef<number[]>([]);
  const cachedW = useRef(0);
  const cachedFontSize = useRef(0);

  const lastMaskCanvas = useRef<HTMLCanvasElement | null>(null);
  const titleRotationInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const dimCanvas = dimCanvasRef.current;
    const brightCanvas = brightCanvasRef.current;
    const hoverCanvas = hoverCanvasRef.current;
    const solidCanvas = solidCanvasRef.current;
    if (!dimCanvas || !brightCanvas || !hoverCanvas || !solidCanvas) return;

    const dim = dimCanvas;
    const bright = brightCanvas;
    const hover = hoverCanvas;
    const solid = solidCanvas;

    const isMobile = "ontouchstart" in window || window.innerWidth < 768;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowEndDevice = (navigator.hardwareConcurrency ?? 8) <= 4;
    const isPerfMode = prefersReducedMotion || isLowEndDevice;
    const FPS_INTERVAL = isMobile ? 1000 / 15 : 1000 / 60;

    let rafId = 0;
    let lastFrameTime = 0;
    let isHeroVisible = true;
    let frameSkip = 0;

    let revealDone = false;

    let isDark = document.documentElement.classList.contains("dark");
    let textColor = isDark ? "#ffffff" : "#111111";
    let textColorRgb = isDark ? "255,255,255" : "17,17,17";

    const mousePos = { x: -1000, y: -1000 };
    const HOVER_RADIUS = 200;
    const TEXT_PROXIMITY = 100;
    const textBounds = { x: 0, y: 0, w: 0, h: 0 };

    const MAGNETIC_RADIUS = 200;
    const MAGNETIC_STRENGTH = 25;

    const solidOpacity = { value: 1 };
    const solidSubOpacity = { value: 1 };
    let subSplitY = 0;

    function buildMaskUrl(cssW: number, cssH: number) {
      const tmp = document.createElement("canvas");
      const dpr = isMobile ? 1 : (window.devicePixelRatio || 1); // Force 1x on mobile
      tmp.width = cssW * dpr;
      tmp.height = cssH * dpr;
      const ctx = tmp.getContext("2d", { alpha: true, willReadFrequently: false });
      if (!ctx) return;

      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssW, cssH);

      const isMobileSplit = cssW < 600;
      const nameFontSize = Math.max(48, Math.min(cssW * 0.09, 180));
      const subFontSize = nameFontSize * 0.45;
      const nameLineGap = isMobileSplit ? nameFontSize * 0.15 : 0;
      const nameY = cssH / 2 - (isMobileSplit ? nameFontSize * 1.0 : 0);
      const name2Y = nameY + nameFontSize + nameLineGap;
      const subY = (isMobileSplit ? name2Y : nameY) + nameFontSize * 0.55 + (isMobileSplit ? 10 : 0);
      subSplitY = isMobileSplit ? name2Y + nameFontSize * 0.15 : nameY + nameFontSize * 0.15;
      const revealHeight = nameFontSize * 1.2;

      const nameLines = isMobileSplit ? ["YONATAN", "ASSEFA"] : [NAME_TEXT];

      ctx.font = `700 ${nameFontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;
      const nw1 = ctx.measureText(nameLines[0]!).width;
      const nw2 = nameLines[1] ? ctx.measureText(nameLines[1]!).width : 0;
      const nw = Math.max(nw1, nw2);
      ctx.font = `700 ${subFontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;
      ctx.letterSpacing = "0.3em" as any;
      const sw = ctx.measureText(SUB_TEXT).width;
      const totalW = Math.max(nw, sw);
      textBounds.x = (cssW - totalW) / 2;
      textBounds.y = nameY - nameFontSize;
      textBounds.w = totalW;
      textBounds.h = subY + subFontSize - (nameY - nameFontSize);
      ctx.letterSpacing = "0px" as any;

      ctx.fillStyle = textColor;
      ctx.textBaseline = "alphabetic";
      ctx.font = `700 ${nameFontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;

      const applyMagnetic = revealDone && mousePos.x > -999;

      let globalCharIdx = 0;
      for (let lineIdx = 0; lineIdx < nameLines.length; lineIdx++) {
        const line = nameLines[lineIdx]!;
        const lineWidth = ctx.measureText(line).width;
        let cursorX = (cssW - lineWidth) / 2;
        const lineY = lineIdx === 0 ? nameY : name2Y;

        for (let i = 0; i < line.length; i++) {
          const lp = letterProgress.current[globalCharIdx]!;
          const char = line[i]!;
          const charW = ctx.measureText(char).width;

          let ox = 0;
          let oy = 0;
          if (applyMagnetic) {
            const cx = cursorX + charW / 2;
            const cy = lineY - nameFontSize * 0.3;
            const dx = cx - mousePos.x;
            const dy = cy - mousePos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MAGNETIC_RADIUS && dist > 0) {
              const force = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH;
              ox = (dx / dist) * force;
              oy = (dy / dist) * force;
            }
          }

          ctx.save();
          ctx.beginPath();
          ctx.rect(cursorX - 2 + ox, lineY - nameFontSize + oy, charW + 4, revealHeight);
          ctx.clip();
          ctx.globalAlpha = lp.opacity;
          ctx.fillText(char, cursorX + ox, lineY + lp.y * revealHeight + oy);
          ctx.restore();

          cursorX += charW;
          globalCharIdx++;
        }

        if (isMobileSplit && lineIdx === 0) globalCharIdx++;
      }

      ctx.font = `700 ${subFontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;
      ctx.letterSpacing = "0.3em" as any;
      const subWidth = ctx.measureText(SUB_TEXT).width;
      let cursorX = (cssW - subWidth) / 2;
      const subRevealH = subFontSize * 1.4;

      for (let i = 0; i < SUB_TEXT.length; i++) {
        const lp = letterProgress.current[NAME_TEXT.length + i]!;
        const char = SUB_TEXT[i]!;
        const charW = ctx.measureText(char).width;

        let ox = 0;
        let oy = 0;
        if (applyMagnetic) {
          const cx = cursorX + charW / 2;
          const cy = subY - subFontSize * 0.3;
          const dx = cx - mousePos.x;
          const dy = cy - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAGNETIC_RADIUS && dist > 0) {
            const force = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH;
            ox = (dx / dist) * force;
            oy = (dy / dist) * force;
          }
        }

        ctx.save();
        ctx.beginPath();
        ctx.rect(cursorX - 2 + ox, subY - subFontSize + oy, charW + 4, subRevealH);
        ctx.clip();
        ctx.globalAlpha = lp.opacity;
        ctx.fillText(char, cursorX + ox, subY + lp.y * subRevealH + oy);
        ctx.restore();

        cursorX += charW;
      }

      lastMaskCanvas.current = tmp;

      const maskUrl = tmp.toDataURL();
      bright.style.maskImage = `url(${maskUrl})`;
      bright.style.maskSize = "100% 100%";
      bright.style.maskRepeat = "no-repeat";
      (bright.style as any).webkitMaskImage = `url(${maskUrl})`;
      (bright.style as any).webkitMaskSize = "100% 100%";
      (bright.style as any).webkitMaskRepeat = "no-repeat";
    }

    function drawSolidText(canvas: HTMLCanvasElement) {
      if (!lastMaskCanvas.current) return;
      const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: false });
      if (!ctx) return;

      const dpr = isMobile ? 1 : (window.devicePixelRatio || 1); // Force 1x on mobile
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      const pw = Math.round(cssW * dpr);
      const ph = Math.round(cssH * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const mask = lastMaskCanvas.current;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, cssW, subSplitY);
      ctx.clip();
      ctx.globalAlpha = solidOpacity.value;
      ctx.drawImage(mask, 0, 0, cssW, cssH);
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = textColor;
      ctx.fillRect(0, 0, cssW, cssH);
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, subSplitY, cssW, cssH - subSplitY);
      ctx.clip();
      ctx.globalAlpha = solidOpacity.value * solidSubOpacity.value;
      ctx.drawImage(mask, 0, 0, cssW, cssH);
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = textColor;
      ctx.fillRect(0, 0, cssW, cssH);
      ctx.restore();
    }

    function drawHoverLayer(canvas: HTMLCanvasElement) {
      const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: false });
      if (!ctx) return;

      const dpr = isMobile ? 1 : (window.devicePixelRatio || 1); // Force 1x on mobile
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      const pw = Math.round(cssW * dpr);
      const ph = Math.round(cssH * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      if (mousePos.x < 0 || mousePos.y < 0) return;

      const gradient = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, HOVER_RADIUS);
      gradient.addColorStop(0, `rgba(${textColorRgb},1)`);
      gradient.addColorStop(1, `rgba(${textColorRgb},0)`);

      const fontSize = Math.max(8, Math.min(cssW * 0.007, 10));
      const lineHeight = fontSize * 1.35;
      const charWidth = fontSize * 0.602;

      const totalLines = cachedLines.current.length;
      if (totalLines === 0) return;
      const totalContentH = totalLines * lineHeight;
      const hoverScrollY = scrollOffset.current % totalContentH;
      const visibleLines = Math.ceil(cssH / lineHeight) + 2;
      const startLine = Math.floor(hoverScrollY / lineHeight);
      const pixelOffset = hoverScrollY - startLine * lineHeight;

      ctx.font = `400 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`;

      for (let v = 0; v < visibleLines; v++) {
        const i = (startLine + v) % totalLines;
        const y = v * lineHeight - pixelOffset;
        const baseY = y + lineHeight * 0.75;
        let x = 0;
        const tokens = cachedDimTokens.current[i];
        if (!tokens) continue;

        for (const tok of tokens) {
          ctx.fillStyle = tok.color.slice(0, 7) + "ff";
          ctx.fillText(tok.text, x, baseY);
          x += tok.text.length * charWidth;
        }
      }

      ctx.globalCompositeOperation = "destination-in";
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, cssW, cssH);
      ctx.globalCompositeOperation = "source-over";
    }

    function rebuildTokenProgress() {
      let total = 0;
      tokenFlatStartPerLine.current = [];
      for (const lineTokens of cachedDimTokens.current) {
        tokenFlatStartPerLine.current.push(total);
        total += lineTokens.length;
      }

      if (tokenProgress.current.length !== total) {
        tokenProgress.current = Array.from({ length: total }, () => ({ clip: 0 }));
        tokenShuffledIndices.current = Array.from({ length: total }, (_, i) => i);
        for (let i = tokenShuffledIndices.current.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const tmp = tokenShuffledIndices.current[i]!;
          tokenShuffledIndices.current[i] = tokenShuffledIndices.current[j]!;
          tokenShuffledIndices.current[j] = tmp;
        }
      }
    }

    function drawCode(canvas: HTMLCanvasElement, isDim: boolean) {
      const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: false });
      if (!ctx) return;

      const dpr = isMobile ? 1 : (window.devicePixelRatio || 1);
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      const pw = Math.round(cssW * dpr);
      const ph = Math.round(cssH * dpr);

      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fontSize = Math.max(8, Math.min(cssW * 0.007, 10));
      const lineHeight = fontSize * 1.35;
      const charWidth = fontSize * 0.602;

      if (cssW !== cachedW.current || fontSize !== cachedFontSize.current) {
        ctx.font = `400 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`;
        const ratio = isMobile ? 0.08 : cssW >= 2560 ? 1 : 0.7;
        const codeText = heroCodePythonString.slice(0, Math.floor(heroCodePythonString.length * ratio));
        cachedLines.current = wrapText(charWidth, codeText, cssW);
        cachedDimTokens.current = cachedLines.current.map((l) => tokenizeLine(l, true, isDark));
        cachedW.current = cssW;
        cachedFontSize.current = fontSize;
        rebuildTokenProgress();
      }

      ctx.font = `400 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`;

      const totalLines = cachedLines.current.length;
      const totalContentH = totalLines * lineHeight;
      const scrollY = scrollOffset.current % totalContentH;
      const visibleLines = Math.ceil(cssH / lineHeight) + 2;

      ctx.clearRect(0, 0, cssW, cssH);

      const startLine = Math.floor(scrollY / lineHeight);
      const pixelOffset = scrollY - startLine * lineHeight;

      const maxLineWidth = isMobile ? Math.max(...cachedLines.current.map(l => l.length * charWidth)) : 0;
      const horizontalOffset = isMobile ? Math.max(0, (cssW - maxLineWidth) / 2) : 0;

      for (let v = 0; v < visibleLines; v++) {
        const i = (startLine + v) % totalLines;
        const y = v * lineHeight - pixelOffset;
        const baseY = y + lineHeight * 0.75;

        if (!isDim) {
          ctx.fillStyle = textColor;
          ctx.globalAlpha = 0.85;
          ctx.fillText(cachedLines.current[i]!, horizontalOffset, baseY);
        } else {
          let x = horizontalOffset;
          const tokens = cachedDimTokens.current[i];
          if (!tokens) continue;
          const flatStart = tokenFlatStartPerLine.current[i] ?? 0;

          for (let t = 0; t < tokens.length; t++) {
            const tok = tokens[t]!;
            const prog = tokenProgress.current[flatStart + t];
            const clipVal = prog ? prog.clip : 1;
            const tokW = tok.text.length * charWidth;

            if (clipVal > 0.01) {
              if (clipVal < 0.99) {
                ctx.save();
                ctx.beginPath();
                ctx.rect(x, baseY - lineHeight * clipVal, tokW, lineHeight * clipVal);
                ctx.clip();
                ctx.fillStyle = tok.color;
                ctx.fillText(tok.text, x, baseY);
                ctx.restore();
              } else {
                ctx.fillStyle = tok.color;
                ctx.fillText(tok.text, x, baseY);
              }
            }

            x += tokW;
          }
        }
      }
    }

    function draw() {
      if (!isHeroVisible) return;

      if (isMobile && revealDone) {
        frameSkip++;
        if (frameSkip % 3 !== 0) return;
      }

      drawCode(dim, true);

      if (!isMobile && !isPerfMode) {
        drawCode(bright, false);
        drawHoverLayer(hover);
      }

      drawSolidText(solid);

      if (dimCanvasRef.current) {
        buildMaskUrl(dimCanvasRef.current.clientWidth, dimCanvasRef.current.clientHeight);
      }
    }

    const proxy = { value: 0 };
    const scrollTween = gsap.to(proxy, {
      value: 10000,
      duration: isMobile ? 1500 : 900,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        scrollOffset.current = proxy.value;
      },
    });

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const wasVisible = isHeroVisible;
        isHeroVisible = entries[0]?.isIntersecting ?? true;
        
        if (isHeroVisible && !wasVisible) {
          scrollTween.resume();
        } else if (!isHeroVisible && wasVisible) {
          scrollTween.pause();
          if (isMobile) {
            const dimCtx = dim.getContext("2d");
            const solidCtx = solid.getContext("2d");
            if (dimCtx) dimCtx.clearRect(0, 0, dim.width, dim.height);
            if (solidCtx) solidCtx.clearRect(0, 0, solid.width, solid.height);
          }
        }
      },
      { threshold: 0.1 },
    );

    const heroSection = dim.closest("section");
    if (heroSection) visibilityObserver.observe(heroSection);

    const startCodeReveal = () => {
      rebuildTokenProgress();
      if (tokenProgress.current.length === 0) return;

      const shuffledTargets = tokenShuffledIndices.current.map((i) => tokenProgress.current[i]!);
      const total = shuffledTargets.length;
      const totalDuration = isMobile ? 0.5 : 1.2;

      const tl = gsap.timeline();
      
      if (isMobile) {
        shuffledTargets.forEach(target => {
          target.clip = 1;
        });
      } else {
        for (let i = 0; i < total; i++) {
          const delay = (i / total) * totalDuration;
          tl.to(shuffledTargets[i]!, { 
            clip: 1, 
            duration: 0.8,
            ease: "power2.out"
          }, delay);
        }
      }

      tl.call(() => {
        const letters = letterProgress.current;
        if (isMobile) {
          letters.forEach(letter => {
            letter.y = 0;
            letter.opacity = 1;
          });
          revealDone = true;
          startTitleRotation();
        } else {
          gsap.to(letters.slice(0, NAME_TEXT.length), {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.02,
          });
          gsap.to(letters.slice(NAME_TEXT.length, NAME_TEXT.length + SUB_TEXT.length), {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.015,
            onComplete: () => {
              revealDone = true;
              startTitleRotation();
            },
          });
        }
      }, [], isMobile ? 0 : totalDuration - 0.2);
    };

    const startTitleRotation = () => {
      if (titleRotationInterval.current) return;
      
      titleRotationInterval.current = setInterval(() => {
        const letters = letterProgress.current;
        const currentSubLength = ROTATING_TITLES[currentTitleIndex].length;
        
        gsap.to(letters.slice(NAME_TEXT.length, NAME_TEXT.length + currentSubLength), {
          y: -1,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.01,
          onComplete: () => {
            setCurrentTitleIndex((prev) => (prev + 1) % ROTATING_TITLES.length);
            
            setTimeout(() => {
              const nextSubLength = ROTATING_TITLES[(currentTitleIndex + 1) % ROTATING_TITLES.length].length;
              letters.slice(NAME_TEXT.length, NAME_TEXT.length + maxSubLength).forEach(l => {
                l.y = 1;
                l.opacity = 0;
              });
              
              gsap.to(letters.slice(NAME_TEXT.length, NAME_TEXT.length + nextSubLength), {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                stagger: 0.01,
              });
            }, 100);
          },
        });
      }, 4000);
    };

    draw();
    startCodeReveal();

    const onThemeChange = () => {
      isDark = document.documentElement.classList.contains("dark");
      textColor = isDark ? "#ffffff" : "#111111";
      textColorRgb = isDark ? "255,255,255" : "17,17,17";

      cachedW.current = 0;
      cachedFontSize.current = 0;

      if (!isMobile && !isPerfMode) {
        bright.style.display = "";
        hover.style.display = "";
      }
      if (isMobile || isPerfMode) {
        bright.style.display = "none";
        hover.style.display = "none";
      }

      draw();
    };

    window.addEventListener("themechange", onThemeChange);

    function loop(timestamp: number) {
      if (timestamp - lastFrameTime < FPS_INTERVAL) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      lastFrameTime = timestamp;

      if (!prefersReducedMotion) {
        draw();
      }
      rafId = requestAnimationFrame(loop);
    }

    const startLoop = () => {
      rafId = requestAnimationFrame(loop);
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(startLoop, { timeout: 500 });
    } else {
      setTimeout(startLoop, 200);
    }

    const heroEl = dim.parentElement;
    let nearText = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!revealDone) return;
      const rect = dim.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;

      const dx = Math.max(textBounds.x - mousePos.x, 0, mousePos.x - (textBounds.x + textBounds.w));
      const dy = Math.max(textBounds.y - mousePos.y, 0, mousePos.y - (textBounds.y + textBounds.h));
      const dist = Math.sqrt(dx * dx + dy * dy);
      const isNear = dist < TEXT_PROXIMITY;

      if (isNear && !nearText) {
        nearText = true;
        gsap.to(solidOpacity, { 
          value: 0, 
          duration: 0.4, 
          ease: "power2.out"
        });
      } else if (!isNear && nearText) {
        nearText = false;
        gsap.to(solidOpacity, { 
          value: 1, 
          duration: 0.4, 
          ease: "power2.out"
        });
      }
    };

    const onMouseLeave = () => {
      mousePos.x = -1000;
      mousePos.y = -1000;
      if (nearText) {
        nearText = false;
        gsap.to(solidOpacity, { 
          value: 1, 
          duration: 0.4, 
          ease: "power2.out"
        });
      }
    };

    if (!isMobile && heroEl) {
      heroEl.addEventListener("mousemove", onMouseMove);
      heroEl.addEventListener("mouseleave", onMouseLeave);
    }

    if (isMobile || isPerfMode) {
      bright.style.display = "none";
      hover.style.display = "none";
    }

    return () => {
      cancelAnimationFrame(rafId);
      scrollTween.kill();
      visibilityObserver.disconnect();
      window.removeEventListener("themechange", onThemeChange);
      if (heroEl) {
        heroEl.removeEventListener("mousemove", onMouseMove);
        heroEl.removeEventListener("mouseleave", onMouseLeave);
      }
      if (titleRotationInterval.current) {
        clearInterval(titleRotationInterval.current);
        titleRotationInterval.current = null;
      }
    };
  }, [allLetters, currentTitleIndex, maxSubLength]);

  return (
    <div className="hero-code-zone absolute inset-0" aria-hidden="true">
      <canvas ref={dimCanvasRef} className="hero-code-canvas" style={{ opacity: 0.4 }} />
      <canvas ref={brightCanvasRef} className="hero-code-canvas" style={{ opacity: 0.85 }} />
      <canvas ref={hoverCanvasRef} className="hero-code-canvas" style={{ opacity: 0.7 }} />
      <canvas ref={solidCanvasRef} className="hero-code-canvas" />
    </div>
  );
}
