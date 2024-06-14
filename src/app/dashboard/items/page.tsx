'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Item } from '@/lib/types';
import { useEffect, useState } from 'react';
import axiosInstanceClient from '@/lib/axios-client';

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();

  function trimTitle(title: string, maxLength: number = 40) {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  }

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
    <>
      <h2 className="text-2xl">Items Inventory</h2>

      <div className="items-container flex flex-wrap justify-stretch gap-4">
        {items.map((item) => (
          <Card
            style={{
              padding: '1rem',
              width: '340px',
              cursor: 'pointer',
              display: 'flex',
              gap: '10px',
            }}
            key={item.asin}
            onClick={() => clickItem(item)}
          >
            <Image
              src={`/images/${item.asin}/Image1.jpg`}
              width={64}
              height={64}
              alt="Item Image"
            />
            <span>
              <p className="font-semibold">{trimTitle(item.title)}</p>
              <p>ASIN: {item.asin}</p>
              <p>Giacenza: {item.stock}</p>
              <p>Categoria: {item.category.description}</p>
            </span>
          </Card>
        ))}
      </div>
    </>
  );
}
