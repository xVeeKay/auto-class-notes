"use client";

import * as React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  BookOpen,
  CalendarDays,
  FileText,
  Trash2,
  ArrowLeft,
} from "lucide-react";

// Assuming standard shadcn/ui imports
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthContext } from "@/context/AuthContext.tsx";
import { apiFetch } from "@/api/fetchClient.ts";
import { SpinnerCustom } from "@/components/ui/spinner.tsx";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate=useNavigate()

  // Form states (added optional chaining just in case user is not immediately loaded)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Derived state
  const hasProfileChanges =
    formData.name !== user?.name || formData.email !== user?.email;

  const canSubmitPassword =
    passwordData.currentPassword.length > 0 &&
    passwordData.newPassword.length > 0 &&
    passwordData.confirmPassword.length > 0;

  const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${user?._id}`;

  // Handlers
  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
        await apiFetch(`/auth/profile`,{
            method:"PATCH",
            body:{
                name:formData.name,
                email:formData.email,
            }
        })
        setUser({ ...user, name: formData.name, email: formData.email });
        toast.success("Profile updated successfully");
    } catch (error:any) {
      toast.error(error?.message || "Error while editing user info")
    }finally{
        setIsSaving(false)
    }
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if(passwordData.confirmPassword!==passwordData.newPassword){
      toast.error("New password and confirm password not matched")
      return
    }
    setIsLoading(true);
    try {
      await apiFetch("/auth/password",{
        method:"PATCH",
        body:{
          currentPassword:passwordData.currentPassword,
          newPassword:passwordData.newPassword
        }
      })
      toast.success("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error:any) {
      console.log(error)
      toast.error(error?.message || "Error while changing the password")
    }finally{
      setIsLoading(false)
    }
  };

  const handleDeleteAccount = async() => {
      toast.error("Delete your account?", {
        description:
          "This action cannot be undone. All your notes, subjects, and account data will be permanently deleted.",
        action: {
          label: "Delete",
          onClick: async () => {
            try {
              setIsLoading(true)
              await apiFetch(`/auth/account`, {
                method: "DELETE",
              });
              toast.success("Account deleted successfully");
              setUser(null)
              navigate("/login")
            } catch (error: any) {
              toast.error(error?.message || "Failed to delete account");
            } finally{
              setIsLoading(false)
            }
          },
        },
        cancel: {
          label: "Cancel",
          onClick: () => {},
        },
      });
    };

  return (
    <div className="container mx-auto max-w-6xl py-10 px-4 md:px-8 lg:px-12">
      {/* Page Header with Back Button */}
      <div className="mb-8 space-y-6">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="-ml-3 text-muted-foreground hover:text-primary transition-colors"
        >
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="space-y-1.5">
          <h1 className="text-3xl font-semibold tracking-tight">
            Account Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your personal information and security.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Left Column: Profile Card */}
        <aside className="w-full md:w-[320px] shrink-0">
          <Card className="sticky top-8">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24 border-2 border-border/50">
                  <AvatarImage src={avatarUrl} alt={user?.name || "Avatar"} />
                  <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                    {user?.name?.[0] || "?"}
                  </AvatarFallback>
                </Avatar>

                <div className="text-center space-y-1">
                  <h3 className="font-semibold text-lg">{user?.name}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-around text-center mb-6">
                <div className="space-y-1">
                  <div className="flex items-center justify-center text-muted-foreground mb-1">
                    <FileText className="h-4 w-4" />
                  </div>
                  <p className="text-xl font-bold">{user?.stats?.notes || 0}</p>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Notes
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center text-muted-foreground mb-1">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <p className="text-xl font-bold">
                    {user?.stats?.subjects || 0}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Subjects
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <CalendarDays className="h-4 w-4" />
                <span>
                  Member since:{" "}
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "..."}
                </span>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Right Column: Forms */}
        <div className="flex-1 space-y-6">
          {/* Card 1: Personal Information */}
          <form onSubmit={handleProfileSave}>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your account details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button type="submit" disabled={!hasProfileChanges || isSaving}>
                  {isSaving && <SpinnerCustom />}
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </form>

          {/* Card 2: Security */}
          <form onSubmit={handlePasswordSave}>
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Current Password</Label>
                  <Input
                    id="current"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input
                    id="new"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button type="submit" disabled={!canSubmitPassword || loading}>
                  {loading && <SpinnerCustom />}
                  {loading ? "Saving" : "Change Password"}
                </Button>
              </CardFooter>
            </Card>
          </form>

          {/* Card 3: Danger Zone */}
          <Card className="border-destructive/50 border-2">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Permanently delete your account and all associated data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-muted-foreground">
                This action cannot be undone. All your notes an d subjects will
                be wiped from our servers forever.
              </p>
            </CardContent>
            <CardFooter className="border-t border-destructive/20 bg-destructive/5 px-6 py-4">
              <Button
                type="button"
                variant="destructive"
                className="gap-2"
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                <Trash2 className="h-4 w-4" />
                {loading && <SpinnerCustom />}
                {loading ? "Deleting" : "Delete Account"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
