import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Footer } from "@/components/footer";

const ProfileHeader = dynamic(() => import('@/components/ProfileHeader/ProfileHeader'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const Sidebar = dynamic(() => import('@/components/Sidebar/Sidebar'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ProfileHeader agregado aquí */}
      <ProfileHeader />
      
      <div className="flex flex-1">
      <main className="flex-1 overflow-auto ">
        <Sidebar />
        
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}