import MobileNav from '@/components/shared/MobileNav';
import Sidebar from '@/components/shared/Sidebar';
import NextTopLoader from 'nextjs-toploader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='root'>
      {/* sidebar */}
      <Sidebar />
      {/* mobileNav */}
      <MobileNav />

      <div className='root-container'>
        <div className='wrapper'>
          <NextTopLoader />
          {children}
        </div>
      </div>
    </main>
  );
}
