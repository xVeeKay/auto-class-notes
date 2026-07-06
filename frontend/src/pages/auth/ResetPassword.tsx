import { ResetPasswordForm } from "@/components/ResetPasswordForm.tsx";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-3 self-center">
          <img
            src="/logo.png"
            alt="Revly"
            className="w-8 h-8 object-contain dark:invert shrink-0"
          />
          <span className="font-bold text-2xl text-foreground">Revly</span>
        </Link>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
