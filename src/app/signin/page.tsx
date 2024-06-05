"use client";

import LoginPage from "@/components/login";
import SignUpPage from "@/components/signup";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DialogPage from "@/components/dialog-trigger";

export default function SignInPage() {
  const router = useRouter();

  const [showMessage, setShowMessage] = useState(false);

  const timer = setTimeout(() => {
    setShowMessage(true)
  }, 5000);


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
              href={"/forgotpass"}
              className=" transition-all font-semibold hover:text-red-500 hover:transition-all p-4"
            >
              Forgot Password
            </Link>
          </div>

          {showMessage === true ? (
            <>
              <DialogPage></DialogPage>
            </>
          ) : null}
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
