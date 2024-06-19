import { NextRequest, NextResponse } from 'next/server';

import { signupConfirm } from '@/helpers/mailer';
import axiosInstanceServer from '@/lib/axios-server';


export async function POST(req: NextRequest) {
  try {
    const { email, id, mode } = await req.json();

    const sent = await signupConfirm(email, id, mode);
    return NextResponse.json({ sent, id }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
