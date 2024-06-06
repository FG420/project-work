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
import { useToast } from "@/components/ui/use-toast"


import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import passvalidation from "@/app/pass-validation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ToastAction } from "@radix-ui/react-toast";

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
  const { toast } = useToast()

  const [showMessage, setShowMessage] = useState(false);

  // const timer = setTimeout(() => {
  //   setShowMessage(true)
  //   console.log('ciao')
  //   //! Working !
  //   // window.location.reload()

  //   }, 5000);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(
    () => {
      let timer1 = setTimeout(() => setShowMessage(true), 5 * 1000);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1);
        setShowMessage(false)
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    [showMessage]
  );


  // useEffect(() => {
  //     clearTimeout(timer);

  // }, []);

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
      {showMessage === false ? null : (
          toast({
            title: "Scheduled: Catch up ",
            description: "Friday, February 10, 2023 at 5:57 PM",
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          })
      ) }

    </>
  );
}
