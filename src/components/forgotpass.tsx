'use client'
import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";import { Button } from './ui/button'
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
    email: z.string()
    .min(5, { message: 'Must have at least 5 character' })
    .email({
      message: 'Must be a valid email',
    })
});

function ForgotPass() {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // try {
        //     const res = await axios.post("api/user", values);
        //     console.log(res.data);
        // } catch (error: any) {
        //     console.log(error);
        // }
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
                                <p>RECOVER THE PASSWORD</p>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">RESET PASSWORD</Button>
                </form>
            </Form>
        </>
  )
}

export default ForgotPass