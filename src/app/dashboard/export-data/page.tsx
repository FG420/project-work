'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosInstanceClient from '@/lib/axios-client';
import { json2csv } from 'json-2-csv';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { useState } from 'react';

type Items = {
  id: string;
  label: string;
};

const items: Items[] = [
  { id: 'Category', label: 'Category' },
  { id: 'Item', label: 'Item' },
  { id: 'LoginAttempts', label: 'Login Attempts' },
  { id: 'Marketplace', label: 'Marketplace' },
  { id: 'Order', label: 'Order' },
  { id: 'Purchase', label: 'Purchase' },
  { id: 'Supplier', label: 'Supplier' },
  { id: 'User', label: 'User' },
];

const FormSchema = z.object({
  items: z.array(z.string()).nonempty('You must select at least one item to export'),
});

export default function ExportDataPage() {
  const [allSelected, setAllSelected] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function handleSelectAll() {
    form.setValue(
      'items',
      items.map((item) => item.id),
    );
    setAllSelected(true);
  }

  function handleDeselectAll() {
    form.setValue('items', []);
    setAllSelected(false);
  }

  async function onSubmit(data: { items: string[] }) {
    try {
      const zip = new JSZip();
      const selectedItems = data.items;

      for (const item of selectedItems) {
        const response = await axiosInstanceClient.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${item}`,
        );
        const csv = await json2csv(response.data);
        zip.file(`${item}.csv`, csv);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, 'data.zip');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error fetching or processing the data.',
        variant: 'destructive',
      });
      console.error('Error fetching data:', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base text-2xl">
                  Select Data to Export
                </FormLabel>
                <FormDescription>Select the items you want to download.</FormDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant={'outline'} type="button" onClick={handleSelectAll}>
                  Select All
                </Button>
                <Button variant={'outline'} type="button" onClick={handleDeselectAll}>
                  Deselect All
                </Button>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            style={{ border: '1px solid red' }}
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter((value) => value !== item.id),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item.label}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Export Data</Button>
      </form>
    </Form>
  );
}
