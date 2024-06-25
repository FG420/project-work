'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { HeaderMobile } from '@/components/header-mobile';
import { SideNav } from '@/components/side-nav';
import PageWrapper from '@/components/page-wrapper';
import MarginWidthWrapper from '@/components/margin-width-wrapper';
import { useRouter } from 'next/navigation';
import { useIdleTimer } from 'react-idle-timer';
import { removeTokenCookie } from '@/lib/cookies';

const HomePageLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
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
    <div className="flex">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
};

export default HomePageLayout;
