"use client";
import {
  Calendar,
  CameraIcon,
  ChevronsUpDown,
  FileIcon,
  HandCoinsIcon,
  Home,
  Inbox,
  Search,
  Settings,
  User2,
  WorkflowIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ThemeToggle } from "../ThemeToggle";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { SelectSeparator } from "../ui/select";
import { ExitIcon } from "@radix-ui/react-icons";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoaderCircular from "./LoaderCircular";
import { useParams, usePathname } from "next/navigation";

// Menu items.
const Tools = [
  {
    label: "Image Restore",
    route: "/transformations/add/restore",
    icon: Inbox,
  },
  {
    label: "Generative Fill",
    route: "/transformations/add/fill",
    icon: Calendar,
  },
  {
    label: "Object Remove",
    route: "/transformations/add/remove",
    icon: Search,
  },
  {
    label: "Object Recolor",
    route: "/transformations/add/recolor",
    icon: Settings,
  },
  {
    label: "Background Remove",
    route: "/transformations/add/removeBackground",
    icon: CameraIcon,
  },
];

let lastPath: string | null = null;

function setLastPath(path: string) {
  lastPath = path;
}

export function AppSidebar() {
  const currPath = usePathname();
  const {
    open: isSidebarOpen,
    openMobile,
    setOpenMobile,
    state,
  } = useSidebar();
  const isMobile = useIsMobile();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  if (!isSignedIn) return null;

  const handleSignOut = () => {
    setIsLoading(true);
    signOut({ redirectUrl: "/" });
  };

  if (openMobile) {
    //first time set lastPath
    if (!lastPath) {
      setLastPath(currPath);
    }

    //close mobile sidebar on route change
    if (currPath !== lastPath) {
      setOpenMobile(false);
      setLastPath(currPath);
    }
  }

  return (
    <Sidebar variant="floating" collapsible="icon">
      {isLoading && <LoaderCircular message="Signing out..." />}

      {/* header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <WorkflowIcon />
                  <span>Select Workspace</span>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={isMobile ? "bottom" : "right"}
                sideOffset={15}
                className="p w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem className="hover:bg-sidebar-accent">
                  <FileIcon />
                  <span>Acme Inc</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-sidebar-accent">
                  <FileIcon />
                  <span>Acme Corp.</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Dashboard content group */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/"}>
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Tools content group */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Tools.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link href={item.route}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-between items-center">
            {(isSidebarOpen || openMobile) && (
              <ThemeToggle
                size={"sm"}
                dropDownItemClassName="hover:bg-sidebar-accent"
                className="rounded-xl border-none bg-inherit hover:bg-sidebar-accent"
              />
            )}
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger className="">
                <SidebarMenuButton className="py-5">
                  {user?.imageUrl ? (
                    <img
                      src={user?.imageUrl}
                      alt={user?.firstName || "User"}
                      className="h-8 w-8 mr-2 rounded-full"
                    />
                  ) : (
                    <User2 />
                  )}
                  <span>{user?.fullName || "User"}</span>
                  {(isSidebarOpen || openMobile) && (
                    <ChevronsUpDown className="ml-auto" />
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={isMobile ? "bottom" : "right"}
                sideOffset={15}
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <UserButton afterSignOutUrl="/" showName={isSidebarOpen} />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-sidebar-accent"
                  onClick={() => setDropdownOpen(false)}
                >
                  <User2 />
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-sidebar-accent"
                  onClick={() => setDropdownOpen(false)}
                >
                  <HandCoinsIcon />
                  <Link href="/credits">Buy Credits</Link>
                </DropdownMenuItem>
                <SelectSeparator />
                <DropdownMenuItem
                  className="hover:bg-sidebar-accent"
                  onClick={() => {
                    handleSignOut();
                    setDropdownOpen(false);
                  }}
                >
                  <ExitIcon />
                  <Link href="#">Sign Out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
