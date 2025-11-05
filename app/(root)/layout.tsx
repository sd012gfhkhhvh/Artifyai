import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="root">
      <SignedIn>
        {/* sidebar */}
        <Sidebar />
        {/* mobileNav */}
        <MobileNav />
        <div className="root-container">
          <div className="wrapper">{children}</div>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="landing-wrapper">{children}</div>
      </SignedOut>
    </main>
  );
}
