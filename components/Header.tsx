import { HeaderLinks } from "./HeaderLinks";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { ModeToggle } from "./ModeToggle";

export default function SiteHeader() {
  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <ModeToggle />
            <HeaderLinks />
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
