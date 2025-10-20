import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeyPeople } from '../person';
import { postEnrollment, postRenewEnrollment } from './api';
import { queryKeyEnrollments } from './queries';
import { EnrollmentCreateDto, EnrollmentModel } from './types';

export const usePostEnrollment = () => {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error, mutateAsync } = useMutation({
    mutationFn: (params: Omit<EnrollmentCreateDto, 'id'>) => postEnrollment(params),
    onSuccess: (data) => {
      const queryKey = queryKeyEnrollments();

      queryClient.setQueryData<EnrollmentModel[]>(queryKey, (oldData) => {
        if (oldData === undefined) {
          return [data];
        }

        return [...oldData, data].sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
      });

      queryClient.invalidateQueries({ queryKey: queryKeyPeople() });
    },
  });

  return { data, isPending, isError, error, mutateAsync };
};

export const usePostRenewEnrollment = () => {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error, mutateAsync } = useMutation({
    mutationFn: (id: number) => postRenewEnrollment(id),
    onSuccess: (data) => {
      const queryKey = queryKeyEnrollments();

      queryClient.setQueryData<EnrollmentModel[]>(queryKey, (oldData) => {
        if (oldData === undefined) {
          return [data];
        }

        return oldData.map((item) => {
          if (item.enrollmentId === data.enrollmentId) {
            return data;
          }
          return item;
        });
      });
    },
  });

  return { data, isPending, isError, error, mutateAsync };
};
