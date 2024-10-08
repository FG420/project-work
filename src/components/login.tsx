import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { setTokenCookie } from '@/lib/cookies';
import { useEffect } from 'react';
import passvalidation from '@/lib/pass-validation';

const formSchema = z.object({
  email: z.string().min(6, { message: 'Must have at least 5 character' }).email({
    message: 'Must be a valid email',
  }),
  password: z
    .string()
    .min(8, { message: 'Must have at least 8 character' })
    .regex(passvalidation(), {
      message: 'Your password is not valid',
    }),
});

export default function LoginComponent() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const message = () => {
      toast({
        title: 'Form Resetting!',
        description: '30 Seconds passed, from resetting!',
        action: <ToastAction altText="Form resetting toast">Close</ToastAction>,
      });
      form.reset();
    };

    const timer = setInterval(message, 30000);

    return () => clearTimeout(timer);
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL! + '/Authentication/Login',
        values,
      );

      if (res.status === 200) {
        setTokenCookie(res.data);
        router.push('/login');
      }
    } catch (error: any) {
      toast({
        title: 'Ops, Something went Wrong!',
        description: 'Please check if the fileds are correctly filled !',
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center p-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="p-8">
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="p-8">
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-4">
            <Button type="submit" className="transition-all hover:transition-all ">
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
