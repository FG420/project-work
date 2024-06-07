"use client";

import SignUpComponent from "@/components/signup";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import React from "react";


export default function SignUpPage () {
    return (
        <main className="flex min-h-screen items-center justify-center ">
            <div>
                <div>
                    <Card className="p-4">
                        <CardHeader className="text-center font-semibold text-xl">Registration Here</CardHeader>
                        <SignUpComponent></SignUpComponent>
                    </Card>
                </div>
                <p className="text-center p-6">Already Register?<br />
                    <Link
                        className="p-2 flex items-center justify-center transition-all text-red-500 hover:text-red-300
                            hover:transition-all"
                        href={ "/signin" }
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    );
}
