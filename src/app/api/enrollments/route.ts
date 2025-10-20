import { NextRequest } from 'next/server';

import { fetchAPI, fetchOptionsGET, fetchOptionsPOST, processResponse } from '@/lib/api';

export async function GET(request: NextRequest) {
  const options = fetchOptionsGET();

  const response = await fetchAPI('/enrollments', options);
  return processResponse(request, response);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const options = fetchOptionsPOST(body);

  const response = await fetchAPI('/enrollments', options);
  return processResponse(request, response);
}
