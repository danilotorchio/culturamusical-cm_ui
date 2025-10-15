import { useQuery } from '@tanstack/react-query';

import { getPlans } from './api';

export const queryKeyPlans = () => ['plans'];

export const usePlansQuery = () => {
  return useQuery({
    queryKey: queryKeyPlans(),
    queryFn: () => getPlans(),
  });
};
