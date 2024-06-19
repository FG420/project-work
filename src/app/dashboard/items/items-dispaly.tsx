'use client';

import ItemsDropdown from '@/components/items-dropdown';
import { Card } from '@/components/ui/card';
import { Item } from '@/lib/types';
import { trimTitle } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ItemsDisplayProps = {
  items: Item[];
};

export default function ItemsDiplay({ items }: ItemsDisplayProps) {
  const [filter, setFilter] = useState<string>('All');
  const router = useRouter();

  function clickItem(item: Item) {
    router.push(`/dashboard/items/${item.asin}`);
  }

  return (
    <>
      <h2 className="text-2xl mb-4">Items Inventory</h2>

      <ItemsDropdown onFilterChange={setFilter} items={items} />
      <div className="items-container flex flex-wrap justify-stretch gap-4 mt-5">
        {items
          .filter((item) => item.category.description === filter || filter === 'All')
          .map((item) => (
            <Card
              className="flex p-4 gap-3 cursor-pointer"
              style={{
                width: '400px',
              }}
              key={item.asin}
              onClick={() => clickItem(item)}
            >
              <Image
                src={`/images/${item.asin}/Image1.jpg`}
                width={85}
                height={85}
                alt="Item Image"
              />
              <span>
                <p className="font-semibold">{trimTitle(item.title)}</p>
                <p>Giacenza: {item.stock}</p>
                <p>Categoria: {item.category.description}</p>
                <p className="text-sm opacity-75">ASIN: {item.asin}</p>
              </span>
            </Card>
          ))}
      </div>
    </>
  );
}
