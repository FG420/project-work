'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { format, isWithinInterval, startOfWeek } from 'date-fns';
import axiosInstanceClient from '@/lib/axios-client';
import { Category, Item, Purchase, PurchasedItem, Supplier } from '@/lib/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from '../date-range-picker';
import { Button } from '../ui/button';
Chart.register( ...registerables );

const BarChartPurchases = () => {
    const [ chartData, setChartData ] = useState( {
        labels: [],
        datasets: [
            {
                label: 'Total Quantity Purchases',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Total Purchases',
                data: [],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    } );

    const [ dateRange, setDateRange ] = useState<DateRange | undefined>( undefined );
    const [ selectedItem, setSelectedItem ] = useState<string>( '' );
    const [ items, setItems ] = useState<Item[]>( [] );
    const [ suppliers, setSuppliers ] = useState<Supplier[]>( [] );
    const [ selectedSupplier, setSelectedSupplier ] = useState<string>( '' );
    const [ category, setCategory ] = useState<Category[]>( [] );
    const [ selectedCategory, setSelectedCategory ] = useState<string>( '' );
    const [ selectKey, setSelectKey ] = useState( 0 );
    const [ datePickerKey, setDatePickerKey ] = useState( 0 );


    const handleDateChange = ( dates: DateRange ) => {
        setDateRange( dates );
    };

    const handleItemChange = ( event: string ) => {
        setSelectedItem( event );
    };

    const handleSupplierChange = ( event: string ) => {
        setSelectedSupplier( event );
    };

    const handleCategoryChange = ( event: string ) => {
        setSelectedCategory( event );
    };

    const fetchData = useCallback( async () => {
        const purchases = await fetchPurchase();
        const purchaseItems = await fetchPurchaseItems();

        const combinedPurchase = purchases.map( ( purchase: Purchase ) => {
            return {
                ...purchase,
                purchaseItems: purchaseItems.filter(
                    ( item: PurchasedItem ) => item.purchaseID === purchase.purchaseID,
                ),
            };
        } );

        // Filter combinedPurchase based on date range and selected item
        const filteredPurchases = combinedPurchase.filter( ( purchase: Purchase ) => {
            const purchaseDate: Date = new Date( purchase.purchaseDate );

            // Check if order falls within the selected date range
            if ( dateRange?.from && dateRange?.to ) {
                const isWithinDateRange = isWithinInterval( purchaseDate, {
                    start: dateRange.from,
                    end: dateRange.to,
                } );
                if ( !isWithinDateRange ) return false;
            }

            // Check if purchase contains the selected item
            if ( selectedItem ) {
                const containsSelectedItem = purchase.purchasedItems.some(
                    ( item ) => item.asin === selectedItem,
                );
                if ( !containsSelectedItem ) return false;
            }

            // Check if purchase is from the selected marketplace
            if ( selectedSupplier ) {
                const isFromSelectedSupplier = purchase.supplierID === selectedSupplier;
                if ( !isFromSelectedSupplier ) return false;
            }

            // Check if purchase contains an item from the selected category
            if ( selectedCategory ) {
                const containsCategoryItem = purchase.purchasedItems.some(
                    ( item ) => item.item.categoryID === selectedCategory,
                );
                if ( !containsCategoryItem ) return false;
            }

            return true;
        } );

        const salesData = processPurchaseData( filteredPurchases, selectedItem );
        const labels = Object.keys( salesData );
        const totalQuantities = labels.map( ( week ) => salesData[ week ].totalQuantity );
        const totalRevenues = labels.map( ( week ) => salesData[ week ].totalRevenue );

        setChartData( {
            // @ts-ignore
            labels,
            datasets: [
                {
                    label: 'Total Quantity Purchases',
                    // @ts-ignore
                    data: totalQuantities,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Total Purchases',
                    // @ts-ignore
                    data: totalRevenues,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                },
            ],
        } );
    }, [ dateRange, selectedItem, selectedSupplier, selectedCategory ] );


    const resetFilters = () => {
        setSelectedItem( '' );
        setSelectedSupplier( '' );
        setSelectedCategory( '' );
        setDateRange( undefined );
        // Update keys to force re-render
        setSelectKey( ( prevKey ) => prevKey + 1 );
        setDatePickerKey( ( prevKey ) => prevKey + 1 );
    };

    useEffect( () => {
        fetchData();
    }, [ fetchData ] );

    useEffect( () => {
        async function fetchItems () {
            const response = await axiosInstanceClient.get(
                `${ process.env.NEXT_PUBLIC_BACKEND_URL }/Item`,
            );
            const data = await response.data;
            setItems( data );
        }

        async function fetchSuppliers () {
            const response = await axiosInstanceClient.get(
                `${ process.env.NEXT_PUBLIC_BACKEND_URL }/Supplier`,
            );

            const data = await response.data;
            setSuppliers( data );
        }

        async function fetchCategories () {
            const response = await axiosInstanceClient.get(
                `${ process.env.NEXT_PUBLIC_BACKEND_URL }/Category`,
            );

            const data = await response.data;
            setCategory( data );
        }

        fetchCategories();
        fetchItems();
        fetchSuppliers();
    }, [] );

    const options = {
        scales: {
            y: {
                type: 'logarithmic' as const,
                ticks: {
                    // @ts-ignore
                    callback: function ( value ) {
                        if ( value === 100 || value === 1000 || value === 10000 || value === 100000 || value === 1000000 ) {
                            return value.toLocaleString()
                        }
                        return null
                    },
                },
            },
        },
    }

    return (
        <div className="flex flex-col justify-center items-center px-2">
            <div className="w-full lg:w-3/4">
                <div className="flex flex-wrap justify-around items-center">
                    <div className="p-3 w-full sm:w-auto">
                        <Select key={ selectKey } onValueChange={ handleItemChange }>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter for Item" />
                            </SelectTrigger>
                            <SelectContent>
                                { items.map( ( item ) => (
                                    <SelectItem key={ item.asin } value={ item.asin }>
                                        { item.title }
                                    </SelectItem>
                                ) ) }
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="p-3 w-full sm:w-auto">
                        <Select key={ selectKey } onValueChange={ handleSupplierChange }>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter for Supplier" />
                            </SelectTrigger>
                            <SelectContent>
                                { suppliers.map( ( item ) => (
                                    <SelectItem key={ item.supplierID } value={ item.supplierID }>
                                        { item.description }
                                    </SelectItem>
                                ) ) }
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="p-3 w-full sm:w-auto">
                        <Select key={ selectKey } onValueChange={ handleCategoryChange }>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter for Category" />
                            </SelectTrigger>
                            <SelectContent>
                                { category.map( ( item ) => (
                                    <SelectItem key={ item.categoryID } value={ item.categoryID }>
                                        { item.description }
                                    </SelectItem>
                                ) ) }
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="p-3 w-full sm:w-auto">
                        <DatePickerWithRange key={ datePickerKey } onDateChange={ handleDateChange } />
                    </div>

                    <div className="p-3">
                        <Button onClick={ resetFilters }>Reset Filters</Button>
                    </div>
                </div>

                <div className="flex justify-center items-center p-4">
                    <Bar data={ chartData } options={ options } />
                </div>
            </div>
        </div>
    );

};

export default BarChartPurchases;

async function fetchPurchase () {
    const response = await axiosInstanceClient.get(
        `${ process.env.NEXT_PUBLIC_BACKEND_URL }/Purchase`
    );
    const data = await response.data
    return data
}

async function fetchPurchaseItems () {
    const response = await axiosInstanceClient.get(
        `${ process.env.NEXT_PUBLIC_BACKEND_URL }/OrderItem`
    );
    const data = await response.data
    return data
}

function processPurchaseData ( purchases: Purchase[], selectedItem: string ) {
    const salesData: { [ key: string ]: { totalQuantity: number; totalRevenue: number } } =
        {};

    purchases.forEach( ( purchase ) => {
        const purchaseDate = new Date( purchase.purchaseDate );
        const weekStart = startOfWeek( purchaseDate );
        const weekKey = format( weekStart, 'dd-MM-yyyy' );

        if ( !salesData[ weekKey ] ) {
            salesData[ weekKey ] = {
                totalQuantity: 0,
                totalRevenue: 0,
            };
        }

        purchase.purchasedItems.forEach( ( item ) => {
            if ( item.asin === selectedItem || !selectedItem ) {
                salesData[ weekKey ].totalQuantity += item.quantity;
                salesData[ weekKey ].totalRevenue += item.price * item.quantity;
            }
        } );
    } );

    console.log( 'Processed Sales Data:', salesData );

    return salesData;
}
