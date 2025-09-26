
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
        </Card>
    </div>
  );
}
