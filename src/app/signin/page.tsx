'use client';

import LoginPage from '@/components/login';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

export default function SignInPage() {
  // Working!
  // const timer = setTimeout( () => {
  //     alert( "30 seconds passed!\nForm Resetting!" )
  //     window.location.reload()
  // }, 30000 )

  return (
    <main className="flex justify-center items-center h-screen">
      <div>
        <div>
          <Card>
            <CardHeader className="text-center font-semibold text-xl pt-10">
              Welcome Back
            </CardHeader>
            <CardContent>
              <LoginPage />
            </CardContent>
            <p className="flex items-center justify-center pt-0 pb-10">
              <Link
                className=" transition-all text-red-500 hover:text-red-300 hover:transition-all"
                href={'/forgotpass'}
              >
                Forgot Password
              </Link>
            </p>
          </Card>
        </div>
        <p className="text-center p-6">
          Not Register Yet? <br />
          <Link
            className="p-2 flex items-center justify-center transition-all text-red-500 hover:text-red-300 hover:transition-all"
            href={'/signup'}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
