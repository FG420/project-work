'use client'


import LoginPage from "@/components/login";
import { Card, CardHeader } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center ">
      <Card className="p-4">
      <CardHeader className="text-center font-semibold text-xl">Sign In</CardHeader>
      <LoginPage></LoginPage>
      </Card>
    </main>
  );
}
