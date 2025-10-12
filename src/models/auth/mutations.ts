import { useMutation } from '@tanstack/react-query';

import { postLogin } from './api';
import { LoginDto } from './types';

export const usePostLogin = () => {
  const { data, isPending, isError, error, mutateAsync } = useMutation({
    mutationFn: (params: LoginDto) => postLogin(params),
  });

  return { data, isPending, isError, error, mutateAsync };
};
