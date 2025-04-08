"use client";
import dynamic from 'next/dynamic';

const CreditosEF = dynamic(() => import('@/components/CreditosEF/CreditosEF'), {
    loading: () => <div>Cargando dashboard...</div>,
  ssr: false
});

export default function Page() {
  return (
    <div className="flex flex-col w-full h-full p-4">
      <CreditosEF />
    </div>
  );
}