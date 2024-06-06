import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import passvalidation from "@/app/pass-validation";
import Link from "next/link";
import { useRef, useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .min(6, { message: "Must have at least 5 character" })
    .email({
      message: "Must be a valid email",
    }),
  password: z
    .string()
    .min(8, { message: "Must have at least 8 character" })
    .regex(passvalidation(), {
      message: "Your password is not valid",
    }),
});

export default function LoginPage() {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  const timer = setTimeout(() => {
    setShowMessage(true);
  }, 5000);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Your submission logic here
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
          <Button type="submit" className="hover:bg-red-400">
            Login
          </Button>
          {/* {showMessage ? (
            <div>
              Login not done!
              <button onClick={() => router.refresh()}>Reload</button>
            </div>
          ) : null} */}
        </form>
        {/* {!showMessage ? showBox() : stopTimeout()} */}
      </Form>
    </>
  );
}
