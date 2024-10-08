import { NextRequest, NextResponse } from 'next/server';

import { forgotPass } from '@/helpers/mailer';

export async function POST(req: NextRequest) {
  try {
    const { email, password, mode } = await req.json();
    const sent = await forgotPass(email, password, mode);
    return NextResponse.json({ sent }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
