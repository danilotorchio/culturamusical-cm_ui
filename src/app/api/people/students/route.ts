import { NextRequest } from 'next/server';

import { fetchAPI, fetchOptionsGET, processResponse } from '@/lib/api';

export async function GET(request: NextRequest) {
  const options = fetchOptionsGET();
  const response = await fetchAPI('/people/students', options);

  return processResponse(request, response);
}
