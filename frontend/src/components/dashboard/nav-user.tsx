"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User,
  LifeBuoy,
  Send
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { apiFetch } from "@/api/fetchClient.ts"
import { toast } from "sonner"
import { AuthContext } from "@/context/AuthContext.tsx"
import { SpinnerCustom } from "../ui/spinner.tsx"

export function NavUser({
  user,
}: {
  user: {
    _id:string,
    name:string,
    email:string,
  }
}) {
  const { isMobile,setOpenMobile } = useSidebar()
  const {setUser}=useContext(AuthContext)
  const navigate=useNavigate()
  const [loading,setLoading]=useState(false)
  if(!user) return null
  const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${user._id}`;

  const handleLogout=async()=>{
    setLoading(true)
    try {
      await apiFetch("/auth/logout",{
        method:"POST"
      })
      setUser(null)
      toast.success("User logged out successfully");
      navigate("/login")
    } catch (error:any) {
      toast.error(error.message || "Error while logging out")
    }finally{
      setLoading(false)
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatarUrl} alt={user?.name} />
                <AvatarFallback className="rounded-lg">
                  {user?.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatarUrl} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">
                    {user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  if (isMobile) setOpenMobile(false);
                  navigate("/profile");
                }}
              >
                <User />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (isMobile) setOpenMobile(false);
                  navigate("/support");
                }}
              >
                <LifeBuoy />
                Support
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (isMobile) setOpenMobile(false);
                  navigate("/feedback");
                }}
              >
                <Send />
                Feedback
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} disabled={loading}>
              <LogOut />
              {loading && <SpinnerCustom />}
              {loading ? "Logging out" : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
