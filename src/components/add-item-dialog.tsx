'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Item } from '@/lib/types';
import { addItem } from '@/lib/actions';

type Prop = {
  buttonName: string;
  title: string;
  items: Item[];
};

const addItemSchema = z.object({
  itemName: z.string().min(2),
  asin: z.string().min(2),
  stock: z.coerce.number().int().min(0),
  category: z.string().min(2),
});

export default function AddItemDialog({ buttonName, title, items }: Prop) {
  const [open, setOpen] = useState(false);

  const uniqueCategories = Array.from(
    new Map(items.map((item) => [item.category.categoryID, item.category])).values(),
  );

  async function onAddItem(data: z.infer<typeof addItemSchema>) {
    const { itemName, asin, stock, category } = data;

    await addItem(itemName, asin, stock, category);
    setOpen(false);
  }

  const addItemForm = useForm<z.infer<typeof addItemSchema>>({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      itemName: '',
      asin: '',
      stock: 0,
      category: '',
    },
  });

  return (
    <div style={{ marginRight: '30px' }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'outline'}>{buttonName}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">{title}</DialogTitle>
          </DialogHeader>
          <Form {...addItemForm}>
            <form onSubmit={addItemForm.handleSubmit(onAddItem)} className="space-y-4">
              {/* Name */}
              <FormField
                control={addItemForm.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Asin */}
              <FormField
                control={addItemForm.control}
                name="asin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ASIN</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="ASIN" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Stock */}
              <FormField
                control={addItemForm.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={addItemForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>

                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {uniqueCategories.map((item) => (
                          <SelectItem value={item.categoryID} key={item.categoryID}>
                            {item.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="flex justify-center mt-10">
                <Button type="submit">Add Item</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
