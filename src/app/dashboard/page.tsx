import TopItemsComponent from '@/components/filtered-items/filter-i-component';
import SalesComponent from '@/components/filtered-orders/filter-o-component';

export default function HomePage() {
  return (
    <main className="py-10 px-4 items-center">
      <SalesComponent />

      <TopItemsComponent />
    </main>
  );
}
