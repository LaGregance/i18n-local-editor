import { Suspense } from 'react';
import HomePageClient from '@/app/home-page-client';

export default function Home() {
  return (
    <Suspense>
      <HomePageClient />
    </Suspense>
  );
}
