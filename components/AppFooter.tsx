export function AppFooter() {
  return (
    <footer className="border-t border-border px-4 pb-24 pt-8 nav:pb-8 md:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Yonatan Assefa
          </p>
        </div>
      </div>
    </footer>
  );
}
