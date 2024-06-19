'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Item } from '@/lib/types';
import { useEffect, useState } from 'react';
import axiosInstanceClient from '@/lib/axios-client';
import ItemsDropdown from '@/components/items-dropdown';
import { trimTitle } from '@/lib/utils';

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await axiosInstanceClient.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL!}/Item`,
        );
        setItems(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  function clickItem(item: Item) {
    router.push(`/dashboard/items/${item.asin}`);
  }

  return (
    <div>
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
    </div>
  );
}
