import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { HttpStatus, fetchAPI, fetchOptionsPOST } from '@/lib/api';
import { LoginResponseDto } from '@/models/auth';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const options = fetchOptionsPOST(body);

  const response = await fetchAPI<LoginResponseDto>('/auth/login', options);

  if (response.error) {
    return NextResponse.json(
      { error: response.error },
      {
        headers: { 'Content-Type': 'application/json' },
        status: response.status,
      },
    );
  }

  const data = response.data;

  if (data && data.token) {
    const cookieStore = await cookies();

    cookieStore.set('auth-token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json(
      { user: data.user },
      { headers: { 'Content-Type': 'application/json' }, status: response.status },
    );
  }

  return NextResponse.json(
    { error: 'Invalid response from server' },
    { headers: { 'Content-Type': 'application/json' }, status: HttpStatus.INTERNAL_SERVER_ERROR },
  );
}
