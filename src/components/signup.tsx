'use client';
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
import passvalidation from '@/app/pass-validation';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import axios from 'axios';
import { toast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import Link from 'next/link';

const formSchema = z
  .object({
    email: z.string().min(6, { message: 'Must have at least 5 character' }).email({
      message: 'Must be a valid email',
    }),
    password: z
      .string()
      .min(8, { message: 'Must have at least 8 character' })
      .regex(passvalidation(), {
        message: 'Your password is not valid',
      }),
    repeatPassword: z.string().min(8, { message: 'Must have at least 8 characters' }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function SignUpPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const [captcha, setCaptcha] = useState<string | null>('');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //! Se il recaptcha è valido, allora invia i dati al server

    if (captcha) {
      // TODO: Captcha Valido
      console.log('Recaptcha is valid');
      try {
        const res = await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_URL! + '/Authentication/Register',
          values,
        );

        console.log(res.data);
        if (res.status === 200) {
          toast({
            title: 'Registration Success !',
            description: 'Press the button to go to Sign In page!',
            action: (
              <ToastAction altText="Registration message" className="p-4">
                <Link href={'/signin'}>Go to Sign In</Link>
              </ToastAction>
            ),
          });
        }
      } catch (error: any) {
        toast({
          title: 'Ops, Something went Wrong!',
          description: 'Please check if the fileds are correctly filled !',
          // action: (
          //   <ToastAction altText="Registration message">Go to Sign In</ToastAction>
          // ),
        });
      }
    } else {
      // TODO: Captcha Non Valido
      console.log('Recaptcha is invalid');
      return;
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex  flex-col items-center justify-center p-5"
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
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem className="p-8">
                <FormControl>
                  <Input type="password" placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="recaptcha" style={{ marginBottom: '20px' }}>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={setCaptcha}
            />
          </div>
          <Button type="submit" className="hover:bg-red-400">
            Sign Up
          </Button>
        </form>
      </Form>
    </>
  );
}
