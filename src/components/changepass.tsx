'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import passvalidation from '@/app/pass-validation';
import { toast } from './ui/use-toast';
import { changePassword } from '@/lib/actions';
import { removeTokenCookie } from '@/lib/cookies';
import { useRouter } from 'next/navigation';

const formSchema = z
  .object({
    newpassword: z
      .string()
      .min(8, { message: 'Must have at least 8 character' })
      .regex(passvalidation(), {
        message: 'Your password is not valid',
      }),
    oldpassword: z.string().min(8, { message: 'Please insert your old Password!' }),
  })
  .refine((data) => data.newpassword != data.oldpassword, {
    message: 'Passwords are the same',
    path: ['oldpassword'],
  });

type ChangePassProps = {
  onClickBtn: () => void;
};

export function ChangePassComponent({ onClickBtn }: ChangePassProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newpassword: '',
      oldpassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { newpassword, oldpassword } = values;

      await changePassword(oldpassword, newpassword);

      onClickBtn();

      toast({
        title: 'Password Changed Successfully ✅',
        description: 'Your password has been changed successfully',
      });
      removeTokenCookie();
      router.push('/signin');
    } catch (error: any) {
      toast({
        title: 'Password Change Fail ❌',
        description: 'There was an error changing your password, please try again.',
      });
    }
  }

  return (
    <main className="">
      <h2 className=" text-center p-8 font-semibold text-xl">Change Password</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10">
          <FormField
            control={form.control}
            name="oldpassword"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormControl>
                  <Input placeholder="Old Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newpassword"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormControl>
                  <Input placeholder="New Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" className="p-2">
              Change Password
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
