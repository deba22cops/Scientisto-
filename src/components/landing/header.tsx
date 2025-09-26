import Link from "next/link";
import { ScientoLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ScientoLogo />
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up Free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
