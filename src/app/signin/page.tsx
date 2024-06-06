"use client";

import LoginPage from "@/components/login";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="">
        <Card className="">
          <CardHeader className="text-center font-semibold text-xl">
            Sign In
          </CardHeader>
          <LoginPage></LoginPage>
        </Card>
      <Link className="flex items-center justify-center p-4" href={'/forgotpass'}>Forgot Password</Link>
      </div>
    </main>
  );
}
