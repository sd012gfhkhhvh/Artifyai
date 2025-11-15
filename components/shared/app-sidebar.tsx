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
import { useState } from "react";
import LoaderCircular from "./LoaderCircular";
import { usePathname } from "next/navigation";

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
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

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
      {/* <SidebarHeader>
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
                className={`${!isMobile ? "mt-2" : ""} min-w-[15rem]`}
              >
                <DropdownMenuItem className="p-0">
                  <SidebarMenuButton>
                    <FileIcon />
                    <span>Acme Inc</span>
                  </SidebarMenuButton>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <SidebarMenuButton>
                    <FileIcon />
                    <span>Acme Corp.</span>
                  </SidebarMenuButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader> */}

      <SidebarSeparator />

      {/* Dashboard content group */}
      {/* <SidebarContent>
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
      </SidebarContent> */}

      {/* Tools content group */}
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
              <SidebarSeparator />
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
              {/* <SidebarMenuButton asChild> */}
              <DropdownMenuTrigger
                className={`${
                  isSidebarOpen || openMobile
                    ? "py-1 hover:bg-sidebar-accent"
                    : ""
                } flex rounded-md  justify-around items-center`}
              >
                {user?.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user?.imageUrl}
                    alt={user?.firstName || "User"}
                    className={`h-8 w-8 rounded-full ${
                      isSidebarOpen || openMobile ? "mx-2" : ""
                    }`}
                  />
                ) : (
                  <User2 />
                )}
                {(isSidebarOpen || openMobile) && (
                  <span className="flex items-center justify-between gap-2 mr-1">
                    {user?.fullName || "User"}
                    <ChevronsUpDown size={15} />
                  </span>
                )}
              </DropdownMenuTrigger>
              {/* </SidebarMenuButton> */}
              <DropdownMenuContent
                side={isMobile ? "bottom" : "right"}
                sideOffset={15}
                className={`${!isMobile ? "mb-2" : ""} min-w-[15rem]`}
              >
                <DropdownMenuItem className="hover:bg-sidebar-accent">
                  <UserButton afterSignOutUrl="/" showName={true} />
                </DropdownMenuItem>
                <SelectSeparator />
                <DropdownMenuItem
                  className="p-0"
                  onClick={() => setDropdownOpen(false)}
                >
                  <SidebarMenuButton>
                    <User2 />
                    <Link className="w-full" href="/profile">
                      Profile
                    </Link>
                  </SidebarMenuButton>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="p-0"
                  onClick={() => setDropdownOpen(false)}
                >
                  <SidebarMenuButton>
                    <HandCoinsIcon />
                    <Link className="w-full" href="/credits">
                      Buy Credits
                    </Link>
                  </SidebarMenuButton>
                </DropdownMenuItem>
                {!isSidebarOpen && !openMobile && (
                  <ThemeToggle
                    size={"icon"}
                    dropDownItemClassName="hover:bg-sidebar-accent"
                    className="w-full rounded-xl border-none bg-inherit hover:bg-sidebar-accent"
                  />
                )}
                <SelectSeparator />
                <DropdownMenuItem
                  className="p-0"
                  onClick={() => {
                    handleSignOut();
                    setDropdownOpen(false);
                  }}
                >
                  <SidebarMenuButton>
                    <ExitIcon />
                    <Link className="w-full" href="#">
                      Sign Out
                    </Link>
                  </SidebarMenuButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
