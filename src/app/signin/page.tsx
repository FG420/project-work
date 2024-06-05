import LoginPage from "@/components/login";
import SignUpPage from "@/components/signup";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import React from "react";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="">
            <LoginPage></LoginPage>
          </Card>
          <div className="flex justify-center">
            <Link
              href={"/"}
              className=" transition-all font-semibold hover:text-red-500 hover:transition-all p-4"
            >
              Forgot Password
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <SignUpPage></SignUpPage>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
