import * as React from "react"
import {
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  SquarePen,
  NotebookPen
} from "lucide-react"
import { useState,useEffect } from "react"

import { NavSubjects } from "./nav-subjects"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { apiFetch } from "@/api/fetchClient"
import { uploadFetch } from "@/api/fetchClient"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext.tsx"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom"
import { useSubjects } from "@/context/SubjectContext.tsx"
import { SpinnerCustom } from "../ui/spinner.tsx"
import { ThemeToggle } from "../theme-toggle.tsx"


const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {isMobile,setOpenMobile}=useSidebar()
    const {subjects,fetchSubjects,loading}=useSubjects()
    const navigate=useNavigate()
    const {user}=useContext(AuthContext)


    const handleSubjectCreation = async (
      e: React.FormEvent<HTMLFormElement>,
    ) => {
      e.preventDefault();

      // 1. Capture the form immediately while it still exists!
      const form = e.currentTarget;

      const formData = new FormData(form);
      const title = formData.get("title") as string;

      const promise = apiFetch("/subjects/create", {
        method: "POST",
        body: { title },
      });

      toast.promise(promise, {
        loading: "Creating subject...",
        success: () => {
          form.reset();
          return `${title} created successfully`;
        },
        error: (err) => err?.message || "Failed to create subject",
      });

      const res = await promise;
      await fetchSubjects()
      if(isMobile){
        setOpenMobile(false)
      }
      navigate(`/dashboard/${res.data._id}`);
    };
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between px-2">
              <SidebarMenuButton size="lg" asChild className="flex-1">
                <Link to="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Auto Notes</span>
                    <span className="truncate text-xs text-muted-foreground">
                      AI Revision Assistant
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>

              <ThemeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Link
          className="flex w-full items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-foreground/90 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          to="/dashboard"
          onClick={() => {
            if (isMobile) setOpenMobile(false);
          }}
        >
          <NotebookPen className="size-4 shrink-0" />
          <span className="truncate">Create Note</span>
        </Link>
        <Dialog>
          {/* 1. Keep the trigger outside of the form */}
          <DialogTrigger asChild>
            <button className="flex w-full items-center gap-3 rounded-md px-4 py-2 text-sm font-medium text-foreground/90 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <SquarePen className="size-4 shrink-0" />
              <span className="truncate">New Subject</span>
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-sm">
            {/* 2. Move the form here, wrapping the content inside the portal */}
            <form onSubmit={handleSubjectCreation} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Create Subject</DialogTitle>
                <DialogDescription>
                  Enter title for your new subject
                </DialogDescription>
              </DialogHeader>

              <FieldGroup>
                <Field>
                  <Label htmlFor="name-1">Title</Label>
                  <Input id="name-1" name="title" defaultValue="Entitled" />
                </Field>
              </FieldGroup>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {loading ? (
          <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
            <SpinnerCustom />
            Loading subjects...
          </div>
        ) : (
          <NavSubjects subjects={subjects} />
        )}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
