import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { apiFetch } from "@/api/fetchClient";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { SpinnerCustom } from "./ui/spinner";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  type AlertState = {
    title: string;
    description: string;
    type: "default" | "destructive" | null | undefined;
    showAlert: boolean;
  };

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState<AlertState>({
    title: "",
    description: "",
    type: "default",
    showAlert: false,
  });

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: { email },
      });

      setAlertState({
        title: "Check your email",
        description:
          "If an account exists, a password reset link has been sent.",
        type: "default",
        showAlert: true,
      });
      setEmail("");
    } catch (error: any) {
      setAlertState({
        title: "Error",
        description:
          error?.response?.data?.errors?.[0]?.message ||
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again.",
        type: "destructive",
        showAlert: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {alertState.showAlert && (
        <Alert variant={alertState.type}>
          {alertState.type === "default" ? (
            <CheckCircle2Icon />
          ) : (
            <AlertCircleIcon />
          )}
          <AlertTitle>{alertState.title}</AlertTitle>
          <AlertDescription>{alertState.description}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              <Field>
                <Button type="submit" disabled={loading || !email}>
                  {loading && <SpinnerCustom />}
                  {loading ? "Sending link..." : "Send Reset Link"}
                </Button>
                <FieldDescription className="text-center mt-2">
                  Remember your password?{" "}
                  <Link to="/login" className="hover:underline text-primary">
                    Back to Login
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <FieldDescription className="text-center px-6 text-muted-foreground">
          If you don't receive the email within a minute, please check your Spam
          folder.
        </FieldDescription>
      </Card>
    </div>
  );
}
