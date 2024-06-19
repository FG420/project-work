'use client';

import { Label } from '@/components/ui/label';
// import { signupConfirm } from '@/helpers/mailer';
// import { User } from '@/lib/types';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function VerifyEmailPage({ params }: any) {
  const router = useRouter();

  const [verify, setVerify] = useState<boolean>(false);
  const getUser = async () => {
    const user = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Authentication/Verify/${params.id}`,
      {
        loginStatus: true,
      },
    );
    setVerify(true);
  };

  useEffect(() => {
    getUser();
    const timer = setTimeout(() => {
      router.push('/signin');
    }, 7000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {/* <h1 className="text-4xl">User {params.id}</h1> */}

      {verify !== true ? (
        <div className="">
          <div>
            <Label className="text-lg font-semibold">Processing Validation...</Label>
          </div>
          <div className='flex justify-center p-4'>
            <Image
              src={'/loading.gif'}
              width={100}
              height={80}
              alt="loading-gif"
              unoptimized
            />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Label className="text-lg font-semibold flex justify-center">
              User Verify
            </Label>
          </div>

          <div className="flex justify-center p-4">
            <Image
              src={'/verify.gif'}
              width={100}
              height={80}
              alt="verify-gif"
              unoptimized
            />
          </div>

          <div>
            <Label>You will now redirect to the Sign In Page!</Label>
          </div>
        </div>
      )}
    </div>
  );
}
