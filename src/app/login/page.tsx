
import { ScientoLogo } from "@/components/icons";
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        <div className="mb-8 text-center">
            <Link href="/" className="inline-block mb-4">
                <ScientoLogo />
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight font-headline">
                Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
                Enter your credentials to access your dashboard.
            </p>
        </div>
        <LoginForm />
        <p className="px-8 mt-4 text-center text-sm text-muted-foreground">
          <Link
            href="/signup"
            className="underline underline-offset-4 hover:text-primary"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
    </div>
  );
}
