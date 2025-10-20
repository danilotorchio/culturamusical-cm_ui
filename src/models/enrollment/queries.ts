import { useQuery } from '@tanstack/react-query';

import { getEnrollments } from './api';

export const queryKeyEnrollments = () => ['enrollments'];

export const useEnrollmentsQuery = () => {
  return useQuery({
    queryKey: queryKeyEnrollments(),
    queryFn: () => getEnrollments(),
  });
};
