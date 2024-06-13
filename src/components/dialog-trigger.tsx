'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { createSupplier } from '@/lib/actions';
import { useState } from 'react';

type Prop = {
  buttonName: string;
  title: string;
};

const formSchema = z.object({
  id: z.coerce.number().int().positive(),
  supplierId: z.coerce.number().int().positive(),
  recipeDate: z.string(),
  recipe: z.string().min(5),
});
const deleteFormSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const addSupplierSchema = z.object({
  name: z.string().min(2),
});

export function DialogComponent({ buttonName, title }: Prop) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 1,
      supplierId: 1,
      recipeDate: '',
      recipe: '',
    },
  });

  const deleteForm = useForm<z.infer<typeof deleteFormSchema>>({
    resolver: zodResolver(deleteFormSchema),
    defaultValues: {
      id: 1,
    },
  });

  const addSupplierForm = useForm<z.infer<typeof addSupplierSchema>>({
    resolver: zodResolver(addSupplierSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema | typeof deleteFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      if (buttonName === 'Delete Purchase') {
        // Delete the purchase
        deleteForm.trigger();
        console.log('purchase deleted');
      } else if (buttonName === 'New Purchase') {
        // Create a new purchase
        form.trigger();
        console.log('purchase added');
      }
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  }

  function onAddSupplier(values: z.infer<typeof addSupplierSchema>) {
    createSupplier(values.name);
    setOpen(false);
  }

  return (
    <main>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>{buttonName}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">{title}</DialogTitle>
          </DialogHeader>
          {buttonName === 'New Purchase' ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-2">ID</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supplierId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-2">Supplier ID</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipeDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-2">Purchase Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recipe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-2">Recipe String</FormLabel>
                      <FormControl>
                        <Input placeholder="jrnjgimreg43545" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center ">
                  <Button type="submit">{buttonName}</Button>
                </div>
              </form>
            </Form>
          ) : (
            <Form {...addSupplierForm}>
              <form
                onSubmit={addSupplierForm.handleSubmit(onAddSupplier)}
                className="space-y-8"
              >
                <FormField
                  control={addSupplierForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-2">Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Supplier Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center ">
                  <Button type="submit">{buttonName}</Button>
                </div>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
