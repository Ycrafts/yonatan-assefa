export const heroCodePythonString = `from __future__ import annotations

import asyncio
from dataclasses import dataclass
from typing import Any, Iterable

@dataclass(frozen=True)
class Project:
    slug: str
    name: str
    stack: list[str]

    def score(self) -> int:
        return len(self.stack) * 10

PROJECTS: list[Project] = [
    Project(slug="portfolio", name="Portfolio", stack=["Next.js", "TypeScript", "Tailwind"]),
    Project(slug="api", name="API", stack=["FastAPI", "PostgreSQL", "Docker"]),
]

def top_projects(items: Iterable[Project], n: int = 2) -> list[Project]:
    return sorted(items, key=lambda p: p.score(), reverse=True)[:n]

async def main() -> None:
    for p in top_projects(PROJECTS):
        await asyncio.sleep(0.01)
        print(f"{p.name}: {', '.join(p.stack)}")

if __name__ == "__main__":
    asyncio.run(main())

# Notes:
# - Clean code, strong types, fast shipping.
# - Always measure, then optimize.
# - Simplicity scales.
`;
