'use client';

import { useState } from 'react';
import axiosInstanceClient from '@/lib/axios-client';
import { updateItemStock } from '@/lib/actions';
import { Input } from './ui/input';
import { Button } from './ui/button';

type UpdateStockProps = {
  asin: string;
  stock: number;
};

export default function UpdateStock({ asin, stock }: UpdateStockProps) {
  const [newStock, setNewStock] = useState<string>(stock.toString());

  const updateStock = async () => {
    const stock = parseInt(newStock);
    await updateItemStock(asin, stock);
  };

  return (
    <div className="flex gap-5 mt-4">
      <Input
        type="number"
        min={0}
        style={{ maxWidth: '230px' }}
        value={newStock}
        onChange={(e) => setNewStock(e.target.value)}
      />
      <Button variant={'secondary'} onClick={updateStock}>
        Update Stock
      </Button>
    </div>
  );
}
