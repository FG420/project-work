"use client";

import { Button } from "@/components/ui/button";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Order } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataOrderTable<TData, TValue> ( { columns, data }: DataTableProps<Order, any> ) {
    const [ columnFilters, setColumnFilters ] = React.useState<ColumnFiltersState>( [] );

    const table = useReactTable( {
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            columnFilters,
        },
    } );


    return (
        <div>
            <div className="p-2 flex items-center py-4 justify-between">
                <div className="p-1">
                    <Input
                        placeholder="Filter ID"
                        value={ ( table.getColumn( "amazonOrderID" )?.getFilterValue() as string ) ?? "" }
                        onChange={ ( event ) =>
                            table.getColumn( "amazonOrderID" )?.setFilterValue( event.target.value )
                        }
                        className="max-w-sm"
                    />
                </div>
                <div className="p-1">
                    <Input
                        type="date"
                        placeholder="Filter for Date"
                        className="w-34 p-2"
                        onChange={ ( event ) =>
                            table.getColumn( "purchaseDate" )?.setFilterValue( event.target.value ? event.target.value : undefined ) }
                    ></Input>
                </div>

                <div className="p-1">
                    <Select onValueChange={ ( event ) =>
                        table.getColumn( "marketplaceID" )?.setFilterValue( event === "all" ? undefined : event ) }>
                        <SelectTrigger className="w-[186px]">
                            <SelectValue placeholder="Filter for Marketplace" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            { Array.from( new Set( data.map( order => order.marketplaceID ) ) )
                                .map( ( marketplaceID ) => (
                                    <SelectItem key={ marketplaceID } value={ marketplaceID }>
                                        { data.find( order => order.marketplaceID === marketplaceID )?.marketplace.marketplaceName }
                                    </SelectItem>
                                ) ) }
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        { table.getHeaderGroups().map( ( headerGroup ) => (
                            <TableRow key={ headerGroup.id }>
                                { headerGroup.headers.map( ( header ) => (
                                    <TableHead key={ header.id } className=" text-center">
                                        { header.isPlaceholder ? null : flexRender( header.column.columnDef.header, header.getContext() ) }
                                    </TableHead>
                                ) ) }
                            </TableRow>
                        ) ) }
                    </TableHeader>
                    <TableBody>
                        { table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map( ( row ) => (
                                <TableRow key={ row.id }>
                                    { row.getVisibleCells().map( ( cell ) => (
                                        <TableCell key={ cell.id } className="text-center">
                                            { flexRender( cell.column.columnDef.cell, cell.getContext() ) }
                                        </TableCell>
                                    ) ) }
                                </TableRow>
                            ) )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={ columns.length } className="h-24 text-center">No results.</TableCell>
                            </TableRow>
                        ) }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
