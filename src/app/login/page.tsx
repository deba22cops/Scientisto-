
import { ScientoLogo } from "@/components/icons";
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-block">
          <ScientoLogo />
        </Link>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight font-headline">Welcome Back</CardTitle>
          <CardDescription>
            Enter your credentials to access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="px-8 mt-4 text-center text-sm text-muted-foreground">
            <Link
              href="/signup"
              className="underline underline-offset-4 hover:text-primary"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
