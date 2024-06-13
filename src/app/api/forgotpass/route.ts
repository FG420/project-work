import { NextRequest, NextResponse } from 'next/server';

import { sendEmail } from '@/helpers/mailer';

type EmailObj = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const sent = await sendEmail(email, password);
    return NextResponse.json({ sent }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'nope' }, { status: 400 });
  }
}
