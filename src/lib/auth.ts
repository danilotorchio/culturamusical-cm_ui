import { cookies } from 'next/headers';

export async function getAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');

  return token?.value || null;
}
