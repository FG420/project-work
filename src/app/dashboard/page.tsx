'use client';

import TopItemsComponent from '@/components/filtered-items/filtered-component';
import HomeComeponent from '@/components/top-suppliers';

export default function HomePage() {
  return (
    <main className="p-4 flex">
      <HomeComeponent />

      <TopItemsComponent />
    </main>
  );
}
