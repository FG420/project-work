'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
// import axios from "axios";
import { useRouter } from "next/navigation";
import passvalidation from "@/app/pass-validation";



const formSchema = z.object({
    email: z.string()
    .min(5, { message: 'Must have at least 5 character' })
    .email({
      message: 'Must be a valid email',
    }),
    password: z.string()
    .min(8, { message: 'Must have at least 8 character' })
    .regex(passvalidation(), {
      message: 'Your password is not valid',
    }),
})


export default function LoginPage() {
    const router = useRouter()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // try {
        //     const res = await axios.post("api/user/login", values)
        //     if (res.status === 200) {
        //         router.push('/')
        //     } else {
        //         return (
        //             <>


        //             </>
        //         )
        //     }
        // } catch (error: any) {
        //     console.log(error)
        // }
    }


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center p-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="p-8">
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
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
                    <Button type="submit">Login</Button>
                </form>
            </Form>
        </>
    );
}

