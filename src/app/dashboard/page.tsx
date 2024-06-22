

import TopItemsComponent from "@/components/filtered-items/filter-i-component";
import SalesComponent from "@/components/filtered-orders/filter-o-component";
import HomeComeponent from "@/components/top-suppliers";




export default function HomePage() {


  return (
    <main className="py-10 px-4 flex items-center">
      <SalesComponent/>

      <TopItemsComponent/>
    </main>
  )
}
