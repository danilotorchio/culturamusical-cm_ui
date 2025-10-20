import { useQuery } from '@tanstack/react-query';

import { getPeople } from './api';

export const queryKeyPeople = () => ['people'];

export const usePeopleQuery = () => {
  return useQuery({
    queryKey: queryKeyPeople(),
    queryFn: () => getPeople(),
  });
};
