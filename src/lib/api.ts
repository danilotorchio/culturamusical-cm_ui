type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  cache?: RequestCache;
  revalidate?: number;
};

export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const fetchOptionsGET = (cache?: RequestCache): FetchOptions => ({
  method: 'GET',
  cache,
});

export async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = { method: 'GET' },
): Promise<{
  data?: T;
  error?: string;
}> {
  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options.body && { body: JSON.stringify(options.body) }),
    ...(options.cache && { cache: options.cache }),
  };

  const response = await fetch(`${process.env.API_URL}${endpoint}`, config);
  const responseData = await response.json();

  if (!response.ok) {
    return { error: responseData.error || 'An error occurred' };
  }

  if (responseData && responseData.data) {
    return { data: responseData.data as T };
  }

  return {};
}
