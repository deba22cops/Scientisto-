import { ScientoLogo } from "@/components/icons";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div className="flex justify-center">
        <ScientoLogo />
      </div>
      <LoginForm />
    </div>
  );
}
