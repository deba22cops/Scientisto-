import { ScientoLogo } from "@/components/icons";
import { SignUpForm } from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="flex justify-center">
        <ScientoLogo />
      </div>
      <SignUpForm />
    </div>
  );
}
