"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFormState } from "react-dom";
import passvalidation from "@/app/pass-validation";
// import axios from "axios";

const formSchema = z.object({
    email: z.string()
    .min(6, { message: 'Must have at least 5 character' })
    .email({
      message: 'Must be a valid email',
    }),
    password: z.string()
    .min(8, { message: 'Must have at least 8 character' })
    .regex(passvalidation(), {
      message: 'Your password is not valid',
    }),
    confirmPassword: z.string()
    .min(8, { message: 'Must have at least 8 characters' })
    }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});

export default function SignUpPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
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
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="p-8">
                                <FormControl>
                                    <Input placeholder="Confirm Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="hover:bg-red-400">Sign Up</Button>
                </form>
            </Form>
        </>
    );
}