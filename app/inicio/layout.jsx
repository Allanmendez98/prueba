import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Carga dinámica de componentes
const ProfileHeader = dynamic(() => import('@/components/ProfileHeader/ProfileHeader'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const Sidebar = dynamic(() => import('@/components/Sidebar/Sidebar'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

export default function InicioLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ProfileHeader />
      <div className="flex flex-1">
      <main className="flex-1 p-4 md:p-6 overflow-auto ">
        <Sidebar />
        
          {children}
        </main>
      </div>
    </div>
  );
}