"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import passvalidation from "@/app/pass-validation";

const formSchema = z
  .object({
    newpassword: z
      .string()
      .min(8, { message: "Must have at least 8 character" })
      .regex(passvalidation(), {
        message: "Your password is not valid",
      }),
    oldpassword: z
      .string()
      .min(8, { message: "Please insert your old Password!" }),
  })
  .refine((data) => data.newpassword != data.oldpassword, {
    message: "Passwords are the same",
    path: ["oldpassword"],
  });

const changePassword = {
  newpassword: "Password1234!",
  oldpassword: "Password123!",
};


export function ChangePassComponent({ onClickBtn }) {
  // ...

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newpassword: "",
      oldpassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (
        values.newpassword === changePassword.newpassword &&
        values.oldpassword === changePassword.oldpassword
      ) {
        console.log("ok!");
      } else {
        console.log("not ok");
      }

      //! Chiudere Dialog
      onClickBtn();
      console.log(values);
    } catch (error: any) {}
  }

  return (
    <main className="">
      <h2 className=" text-center p-8 font-semibold text-xl">
        Change Password
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10">
          <FormField
            control={form.control}
            name="oldpassword"
            render={({ field }) => (
              <FormItem className="p-2">
                <FormControl>
                  <Input
                    placeholder="Old Password"
                    type="password"
                    {...field}
                  />
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
                  <Input
                    placeholder="New Password"
                    type="password"
                    {...field}
                  />
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
