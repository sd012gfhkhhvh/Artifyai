import { cookies } from "next/headers";
import MobileNav from "@/components/shared/MobileNav";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BreadcrumbResponsive } from "@/components/shared/BreadcrumbCustom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <main className="root">
        <SignedIn>
          <AppSidebar />
          <main className="w-full">
            <div className="bg-background h-12 flex items-center sticky top-0 z-10">
              <SidebarTrigger className="mx-4 my-2" />
              <BreadcrumbResponsive />
            </div>
            <div className="px-6 py-2">{children}</div>
          </main>
        </SignedIn>
        <SignedOut>
          <div className="landing-wrapper">{children}</div>
        </SignedOut>
      </main>
    </SidebarProvider>
  );
}
