import { NextRequest } from 'next/server';

import { fetchAPI, fetchOptionsPOST, processResponse } from '@/lib/api';

export async function POST(request: NextRequest) {
  const options = fetchOptionsPOST();

  const { searchParams } = new URL(request.url);
  const enrollmentId = searchParams.get('enrollmentId');

  const response = await fetchAPI(`/enrollments/${enrollmentId}/renew`, options);
  return processResponse(request, response);
}
