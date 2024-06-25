'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { useIdleTimer } from 'react-idle-timer';
import { useEffect, useState } from 'react';
import { removeTokenCookie } from '@/lib/cookies';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [state, setState] = useState<string>('Active');
  const [count, setCount] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const router = useRouter();

  const onIdle = () => {
    setState('Idle');
  };

  const onActive = () => {
    setState('Active');
  };

  const onAction = () => {
    setCount(count + 1);
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 900_000,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemaining = Math.ceil(getRemainingTime() / 1000);

      setRemaining(newRemaining);

      console.log('Remaining time:', newRemaining);

      if (newRemaining === 0) {
        removeTokenCookie();
        router.push('/signin');
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <html lang="en">
      <meta charSet="utf-8" />
      <title>CargoConnect</title>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
