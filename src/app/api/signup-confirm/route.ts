import { NextRequest, NextResponse } from 'next/server';

import { signupConfirm } from '@/helpers/mailer';


export async function POST(req: NextRequest) {
  try {
    const { email, mode } = await req.json();
    const sent = await signupConfirm(email, mode);
    return NextResponse.json({ sent }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
