import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle.tsx";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext.tsx";
import { Button } from "./ui/button.tsx";
import { Link } from "react-router-dom";

export default function Layout() {
  const {user}=useContext(AuthContext)
  return (
    // 1. FIXED INSET: This physically locks the entire application to the four corners of your browser window. It cannot scroll.
    <div className="fixed inset-0 w-full overflow-hidden bg-background flex">
      <SidebarProvider>
        <AppSidebar />

        {/* 2. THE CALC FIX:
            !min-h-0 destroys Shadcn's hardcoded height.
            md:h-[calc(100svh-16px)] perfectly subtracts the 16px vertical margin applied by the inset variant.
        */}
        <SidebarInset className="flex flex-col flex-1 overflow-hidden !min-h-0 md:h-[calc(100svh-16px)] h-[100svh]">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
            {" "}
            <SidebarTrigger className="-ml-1" />{" "}
            <Separator
              orientation="vertical"
              className="mr-2 mt-[1.25rem] h-4"
            />{" "}
            {/* Updated name here! */}
            <span className="text-sm font-bold tracking-wider">REVLY</span>{" "}
            {!user && (
            <div className="flex items-center gap-2.5 ml-auto">
              <Button
                asChild
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-bold px-5 h-9"
              >
                <Link to="/login">Log in</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full bg-muted/20 border-border/60 hover:bg-muted text-sm font-bold px-5 h-9 transition-colors"
              >
                <Link to="/register">Sign up for free</Link>
              </Button>
            </div>
            )}
          </header>

          {/* 3. STRICT MAIN CONTAINER: This passes the remaining height exactly to your Dashboard component */}
          <main className="flex-1 flex flex-col overflow-hidden bg-background min-h-0">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
