'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import AddItemDialog from './add-item-dialog';
import { Item } from '@/lib/types';

type ItemsDropdownProps = {
  onFilterChange: (value: string) => void;
  items: Item[];
};

export default function ItemsDropdown({ onFilterChange, items }: ItemsDropdownProps) {
  const [filter, setFilter] = useState<string>('All');

  function changeFilterValue(value: string) {
    setFilter(value);
    onFilterChange(value);
  }

  return (
    <div className="flex justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'}>Filter</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={filter} onValueChange={changeFilterValue}>
            <DropdownMenuRadioItem value="All">All Items</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Videogiochi">Videogames</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Cartucce per stampanti">
              Printer cartridges
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Caffè Tè e bevande">
              Coffee, Tea and Drinks
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Cavi e Accessori">
              Cables and Accessories
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddItemDialog buttonName={'New Item'} title={'Create a new item'} items={items} />
    </div>
  );
}
