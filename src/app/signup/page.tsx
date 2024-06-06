"use client";

import SignUpComponent from "@/components/signup";
import { Card, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";


export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center ">
      <Card className="p-4">
        <CardHeader className="text-center font-semibold text-xl">Sign Up</CardHeader>
        <SignUpComponent></SignUpComponent>
      </Card>
    </main>
  );
}
