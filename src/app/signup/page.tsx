
import { ScientoLogo } from "@/components/icons";
import { SignUpForm } from "@/components/auth/signup-form";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
                <ScientoLogo />
            </Link>
        </div>
        <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-semibold tracking-tight font-headline">
                    Create an Account
                </CardTitle>
                <CardDescription>
                    Enter your details below to create your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
            <CardFooter>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our{" "}
                    <Link
                        href="/terms-of-service"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="/privacy-policy"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </CardFooter>
        </Card>
    </div>
  );
}
