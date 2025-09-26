import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  PanelLeft,
  Home,
  History,
  Star,
  FileText,
  Settings,
} from "lucide-react";
import { UserNav } from "@/components/dashboard/user-nav";
import { GenextoLogo } from "@/components/icons";

const mobileNavItems = [
  { href: "/dashboard", icon: Home, label: "New Research" },
  { href: "#", icon: History, label: "History" },
  { href: "#", icon: Star, label: "Saved" },
  { href: "#", icon: FileText, label: "Templates" },
  { href: "#", icon: Settings, label: "Account" },
];

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <GenextoLogo className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Genexto</span>
            </Link>
            {mobileNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="ml-auto flex items-center gap-2">
        <UserNav />
      </div>
    </header>
  );
}
