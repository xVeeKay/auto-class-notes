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
import { SpinnerCustom } from "./ui/spinner.tsx";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useParams } from "react-router-dom";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  type AlertState = {
    title: string;
    description: string;
    type: "default" | "destructive" | null | undefined;
    showAlert: boolean;
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {token}=useParams()
  const [alert, setAlert] = useState<AlertState>({
    title: "",
    description: "",
    type: "default",
    showAlert: false,
  });

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({
        title: "Error",
        description: "Passwords do not match.",
        type: "destructive",
        showAlert: true,
      });
      return;
    }

    try {
      setLoading(true);
      await apiFetch(`/auth/reset-password/${token}`, {
        method: "POST",
        body: { password },
      });
      setAlert({
        title: "Success",
        description: "Your password has been reset successfully.",
        type: "default",
        showAlert: true,
      });
    } catch (error: any) {
      setAlert({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to reset password.",
        type: "destructive",
        showAlert: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {alert.showAlert && (
        <Alert variant={alert.type}>
          {alert.type === "default" ? (
            <CheckCircle2Icon />
          ) : (
            <AlertCircleIcon />
          )}
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Set new password</CardTitle>
          <CardDescription>
            Please enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReset}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">New Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading && <SpinnerCustom />}
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
