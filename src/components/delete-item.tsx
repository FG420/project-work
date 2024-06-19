'use client';

import { deleteItem } from '@/lib/actions';
import { Button } from './ui/button';

type DeleteItemProps = {
  asin: string;
};

export default function DeleteItem({ asin }: DeleteItemProps) {
  const onDeleteItem = async () => {
    await deleteItem(asin);
  };

  return <Button onClick={onDeleteItem}>Delete Item</Button>;
}
