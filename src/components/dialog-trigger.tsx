'use client'


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { date, z } from "zod"

type Prop = {
    buttonName: string,
    title: string,
}

const formSchema = z.object( {
    id: z.number(),
    supplierId: z.number(),
    recipeDate: z.date(),
    recipe: z.string().min( 5 )
} )


export function DialogComponent ( { buttonName, title }: Prop ) {

    const form = useForm<z.infer<typeof formSchema>>( {
        resolver: zodResolver( formSchema ),
        defaultValues: {
            id: 1,
            supplierId: 1,
            recipeDate: new Date,
            recipe: '',
        },
    } )

    function onSubmit ( values: z.infer<typeof formSchema> ) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log( values )
    }

    return (
        <main>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>{ buttonName }</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">{ title }</DialogTitle>
                    </DialogHeader>
                    <Form { ...form }>
                        <form onSubmit={ form.handleSubmit( onSubmit ) } className="space-y-8">
                            { buttonName === 'New Purchase' ? (
                                <><FormField
                                    control={ form.control }
                                    name="id"
                                    render={ ( { field } ) => (
                                        <FormItem>
                                            <FormLabel className="p-2">ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="1" type="number" { ...field } />
                                            </FormControl>
                                        </FormItem>
                                    ) } /><FormField
                                        control={ form.control }
                                        name="supplierId"
                                        render={ ( { field } ) => (
                                            <FormItem>
                                                <FormLabel className="p-2">Supplier ID</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="1" type="number" { ...field } />
                                                </FormControl>
                                            </FormItem>
                                        ) } /><FormField
                                        control={ form.control }
                                        name="recipeDate"
                                        render={ ( { field } ) => (
                                            <FormItem>
                                                <FormLabel className="p-2">Purchase Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" { ...field } />
                                                </FormControl>
                                            </FormItem>
                                        ) } /><FormField
                                        control={ form.control }
                                        name="recipe"
                                        render={ ( { field } ) => (
                                            <FormItem>
                                                <FormLabel className="p-2">Recipe String</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="jrnjgimreg43545" type="text" { ...field } />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        ) } /></>
                            ) : (
                                <FormField
                                    control={ form.control }
                                    name="id"
                                    render={ ( { field } ) => (
                                        <FormItem>
                                            <FormLabel className="p-2">ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="1" type="number" { ...field } />
                                            </FormControl>
                                        </FormItem>
                                    ) }
                                />
                            ) }
                            <div className="flex justify-center ">
                                <Button type="submit" >{ buttonName }</Button>
                            </div>
                        </form>
                    </Form>

                </DialogContent>
            </Dialog>
        </main>

    )
}
