import MobileNav from '@/components/shared/MobileNav';
import Sidebar from '@/components/shared/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='root'>
      {/* sidebar */}
      <Sidebar />
      {/* mobileNav */}
      <MobileNav />

      <div className='root-container'>
        <div className='wrapper'>{children}</div>
      </div>
    </main>
  );
}
