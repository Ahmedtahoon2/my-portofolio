import { HeaderLinks } from "@/components/atoms/HeaderLinks";
import { MainNav } from "@/components/atoms/MainNav";
import { MobileNav } from "@/components/atoms/MobileNav";
import { ModeToggle } from "@/components/atoms/ModeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 z-10 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 xl:px-10">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center lg:mr-3">
            <ModeToggle />
            <HeaderLinks />
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
