'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { addPurchase, createSupplier } from '@/lib/actions';
import { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { Item, Supplier } from '@/lib/types';
import axiosInstanceClient from '@/lib/axios-client';

type Prop = {
    buttonName: string;
    title: string;
};

const newPurchaseFormSchema = z.object( {
    supplier: z.string(),
    recipe: z.string().min( 5 ),
    items: z.array(
        z.object( {
            name: z.string(),
            quantity: z.coerce.number(),
            price: z.coerce.number(),
        } ),
    ),
} );

const addSupplierSchema = z.object( {
    name: z.string().min( 2 ),
} );

export function DialogComponent ( { buttonName, title }: Prop ) {
    const [ open, setOpen ] = useState( false );
    const [ suppliers, setSuppliers ] = useState<Supplier[]>( [] );
    const [ items, setItems ] = useState<Item[]>( [] );
    const [ selectedItems, setSelectedItems ] = useState<string[]>( [] );

    const getAllSuppliers = async () => {
        try {
            const allSuppliers = await axiosInstanceClient.get(
                `${ process.env.NEXT_PUBLIC_BACKEND_URL }/Supplier`,
            );
            setSuppliers( allSuppliers.data );
        } catch ( error ) {
            console.log( error );
        }
    };

    const getAllItems = async () => {
        try {
            const allItems = await axiosInstanceClient.get(
                `${ process.env.NEXT_PUBLIC_BACKEND_URL }/Item`,
            );
            setItems( allItems.data );
        } catch ( error ) {
            console.log( error );
        }
    };

    const newPurchase = useForm<z.infer<typeof newPurchaseFormSchema>>( {
        resolver: zodResolver( newPurchaseFormSchema ),
        defaultValues: {
            supplier: '',
            recipe: '',
            items: [ { name: '', quantity: 0, price: 0 } ],
        },
    } );

    const { fields, append, remove } = useFieldArray( {
        control: newPurchase.control,
        name: 'items',
    } );

    const addSupplierForm = useForm<z.infer<typeof addSupplierSchema>>( {
        resolver: zodResolver( addSupplierSchema ),
        defaultValues: {
            name: '',
        },
    } );

    async function onSubmit ( values: z.infer<typeof newPurchaseFormSchema> ) {
        try {
            if ( buttonName === 'New Purchase' ) {

                const purchaseValues = {
                    SupplierID: values.supplier,
                    PurchaseDate: new Date(),
                    RecipeNumber: values.recipe,
                    purchasedItems: values.items.map( ( item ) => ( {
                        asin: item.name,
                        quantity: item.quantity,
                        price: item.price,
                    } ) ),
                };

                await addPurchase( purchaseValues );
                setOpen( false );
            }
        } catch ( error ) {
            console.log( error );
        }
    }

    async function onAddSupplier ( values: z.infer<typeof addSupplierSchema> ) {
        await createSupplier( values.name );
        setOpen( false );
    }

    useEffect( () => {
        getAllSuppliers();
        getAllItems();
    }, [] );

    useEffect( () => {
        const selected = fields.map( ( field ) => field.name );
        setSelectedItems( selected );
    }, [ fields ] );

    const handleItemChange = ( index: number, value: string ) => {
        newPurchase.setValue( `items.${ index }.name`, value );
        const updatedSelectedItems = [ ...selectedItems ];
        updatedSelectedItems[ index ] = value;
        setSelectedItems( updatedSelectedItems );
    };

    return (
        <main>
            <Dialog open={ open } onOpenChange={ setOpen }>
                <DialogTrigger asChild>
                    <Button>{ buttonName }</Button>
                </DialogTrigger>
                <DialogContent className="sm:max p-8 max-h-[80vh] overflow-y-auto">
                    <DialogHeader className="pb-8 pr-8 pl-8 pt-4">
                        <DialogTitle className="text-center">{ title }</DialogTitle>
                    </DialogHeader>
                    { buttonName === 'New Purchase' ? (
                        <Form { ...newPurchase }>
                            <form onSubmit={ newPurchase.handleSubmit( onSubmit ) } className="space-y-8">
                                <div className="flex justify-center">
                                    <Controller
                                        name="supplier"
                                        control={ newPurchase.control }
                                        render={ ( { field: { onChange, value } } ) => (
                                            <FormItem>
                                                <FormLabel className="p-2">Select Supplier</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={ onChange } value={ value }>
                                                        <SelectTrigger className="w-56">
                                                            <SelectValue placeholder="Select Supplier" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            { suppliers.map( ( supplier ) => (
                                                                <SelectItem
                                                                    key={ supplier.supplierID }
                                                                    value={ supplier.supplierID }
                                                                >
                                                                    { supplier.description }
                                                                </SelectItem>
                                                            ) ) }
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        ) }
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <Controller
                                        name="recipe"
                                        control={ newPurchase.control }
                                        render={ ( { field: { onChange, value } } ) => (
                                            <FormItem>
                                                <FormLabel className="p-2">Recipe</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Recipe n˚ "
                                                        type="text"
                                                        onChange={ onChange }
                                                        value={ value }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        ) }
                                    />
                                </div>

                                <hr />

                                { fields.map( ( item, index ) => (
                                    <div key={ item.id }>
                                        <Controller
                                            name={ `items.${ index }.name` }
                                            control={ newPurchase.control }
                                            render={ ( { field: { onChange, value } } ) => (
                                                <div>
                                                    <FormLabel className="p-2">Items</FormLabel>
                                                    <select
                                                        className="flex h-10 items-center 
                                                        justify-between rounded-md border 
                                                        border-input bg-background px-3 py-2 
                                                        text-sm ring-offset-background placeholder:text-muted-foreground
                                                        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                                                        disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-full"
                                                        value={ value }
                                                        onChange={ ( e ) => handleItemChange( index, e.target.value ) }
                                                    >
                                                        <option value="">Select an item</option>
                                                        { items
                                                            .filter(
                                                                ( item ) =>
                                                                    !selectedItems.includes( item.asin ) ||
                                                                    item.asin === value,
                                                            )
                                                            .map( ( item ) => (
                                                                <option key={ item.asin } value={ item.asin }>
                                                                    { item.title }
                                                                </option>
                                                            ) ) }
                                                    </select>
                                                </div>
                                            ) }
                                        />

                                        <div className="flex justify-around">
                                            <Controller
                                                name={ `items.${ index }.quantity` }
                                                control={ newPurchase.control }
                                                render={ ( props ) => (
                                                    <div className="flex items-center p-3">
                                                        <FormLabel className="p-3">Quantity:</FormLabel>
                                                        <Input
                                                            className="w-16 p-2"
                                                            type="number"
                                                            { ...props.field }
                                                            onChange={ props.field.onChange }
                                                            value={ props.field.value }
                                                            min={ 0 }
                                                        />
                                                    </div>
                                                ) }
                                            />
                                            <Controller
                                                name={ `items.${ index }.price` }
                                                control={ newPurchase.control }
                                                render={ ( props ) => (
                                                    <div className="flex items-center p-3 ">
                                                        <FormLabel className="p-3">Unit Price:</FormLabel>
                                                        <Input
                                                            className="w-16 p-2 text-right"
                                                            type="number"
                                                            { ...props.field }
                                                            onChange={ props.field.onChange }
                                                            value={ props.field.value }
                                                            min={ 0 }
                                                        />
                                                        <FormLabel className="p-3">€</FormLabel>
                                                    </div>
                                                ) }
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <Button type="button" onClick={ () => remove( index ) }>
                                                Remove Item
                                            </Button>
                                        </div>
                                    </div>
                                ) ) }

                                <hr />
                                <div className="flex justify-around">
                                    <div className="">
                                        <Button
                                            type="button"
                                            onClick={ () => append( { name: '', quantity: 0, price: 0 } ) }
                                        >
                                            Add Item
                                        </Button>
                                    </div>
                                    <div className="">
                                        <Button type="submit">{ buttonName }</Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    ) : (
                        <Form { ...addSupplierForm }>
                            <form
                                onSubmit={ addSupplierForm.handleSubmit( onAddSupplier ) }
                                className="space-y-8"
                            >
                                <FormField
                                    control={ addSupplierForm.control }
                                    name="name"
                                    render={ ( { field } ) => (
                                        <FormItem>
                                            <FormLabel className="p-2">Name</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Supplier Name" { ...field } />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    ) }
                                />
                                <div className="flex justify-center ">
                                    <Button type="submit">{ buttonName }</Button>
                                </div>
                            </form>
                        </Form>
                    ) }
                </DialogContent>
            </Dialog>
        </main>
    );
}
