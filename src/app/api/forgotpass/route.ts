import { NextRequest, NextResponse } from "next/server";

import { sendEmail } from "@/helpers/mailer";


export async function GET({email, pass}:) {
    try {
        const sent = await sendEmail({email, pass})
        return NextResponse.json({sent}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({'message': 'nope'},{status: 400} )
    }
}