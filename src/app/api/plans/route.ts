import { NextRequest, NextResponse } from 'next/server';

import { fetchAPI, fetchOptionsGET, fetchOptionsPOST, fetchOptionsPUT } from '@/lib/api';

export async function GET() {
  const options = fetchOptionsGET();

  const response = await fetchAPI('/plans', options);
  return processResponse(response);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const options = fetchOptionsPOST(body);

  const response = await fetchAPI('/plans', options);
  return processResponse(response);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const options = fetchOptionsPUT(body);

  const response = await fetchAPI('/plans', options);
  return processResponse(response);
}

function processResponse<T>(response: { data?: T; error?: string; status: number }) {
  if (response.error) {
    return NextResponse.json(
      { error: response.error },
      {
        headers: { 'Content-Type': 'application/json' },
        status: response.status,
      },
    );
  }

  return NextResponse.json(response.data, { headers: { 'Content-Type': 'application/json' }, status: response.status });
}
