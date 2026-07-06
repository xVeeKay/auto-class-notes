import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/loginForm.tsx";

export default function Login() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-3 self-center">
          {/* Replaced the icon container with your dynamic logo */}
          <img
            src="/logo.png"
            alt="Revly"
            className="w-8 h-8 object-contain dark:invert shrink-0"
          />
          {/* Updated text to match the bold styling from the sidebar */}
          <span className="font-bold text-2xl text-foreground">Revly</span>
        </a>
        <LoginForm />
      </div>
    </div>
  );
}