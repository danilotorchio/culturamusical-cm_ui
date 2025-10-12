import { LoginDto, LoginResponseDto } from '.';

type PostLogin = (creds: LoginDto) => Promise<LoginResponseDto>;

export const postLogin: PostLogin = async (creds): Promise<LoginResponseDto> => {
  const endpoint = '/api/auth/login';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(creds),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Falha ao fazer login');
    }

    return data as LoginResponseDto;
  } catch (error) {
    console.error('Client: failed to post login', error);
    throw error;
  }
};
