
import { ScientoLogo } from "@/components/icons";
import { SignUpForm } from "@/components/auth/signup-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        <div className="mb-8 text-center">
            <Link href="/" className="inline-block mb-4">
                <ScientoLogo />
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight font-headline">
                Create an Account
            </h1>
            <p className="text-sm text-muted-foreground">
                Enter your details below to create your account.
            </p>
        </div>
        <SignUpForm />
         <p className="px-8 mt-4 text-center text-sm text-muted-foreground">
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
    </div>
  );
}
