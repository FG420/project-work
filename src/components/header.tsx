'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { LogOut, User } from 'lucide-react';
import { ChangePassComponent } from './changepass';
import { useRouter } from 'next/navigation';
import { removeTokenCookie } from '@/lib/cookies';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const getUserData = async () => {
    try {
      const res = await axios.get('');
    } catch (error: any) {
      console.log(error);
    }
  };

  function closeDialog() {
    setOpen(false);
  }

  useEffect(() => {
    if (!document.cookie) {
      router.push('/signin');
    }
  }, []);

  function handleLogout() {
    removeTokenCookie();
    router.push('/signin');
  }

  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
          'border-b border-gray-200': selectedLayout,
        },
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
            <span className="font-bold text-xl flex ">Logo</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="h-8 w-8 rounded-full bg-zinc-300 flex items-center justify-center text-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="font-semibold text-sm hover:cursor-pointer">HQ</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <DialogTrigger asChild>
                        <span
                          className="hover:cursor-pointer"
                          onClick={() => setOpen(true)}
                        >
                          Change Password
                        </span>
                      </DialogTrigger>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <div>Log out</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent>
                <ChangePassComponent onClickBtn={closeDialog}></ChangePassComponent>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
