import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postPlan, putPlan } from './api';
import { queryKeyPlans } from './queries';
import { PlanModel } from './types';

export const usePostPlan = () => {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error, mutateAsync } = useMutation({
    mutationFn: (params: Omit<PlanModel, 'id' | 'status' | 'value'>) => postPlan(params),
    onSuccess: (data) => {
      const queryKey = queryKeyPlans();

      queryClient.setQueryData(queryKey, (oldData: PlanModel[] | undefined) => {
        if (oldData === undefined) {
          return [data];
        }

        return [...oldData, data];
      });
    },
  });

  return { data, isPending, isError, error, mutateAsync };
};

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error, mutateAsync } = useMutation({
    mutationFn: (data: PlanModel) => putPlan(data),
    onSuccess: (data) => {
      const queryKey = queryKeyPlans();

      queryClient.setQueryData(queryKey, (oldData: PlanModel[] | undefined) => {
        if (oldData === undefined) {
          return [data];
        }

        return oldData.map((plan) => {
          if (plan.id === data.id) {
            return data;
          }
          return plan;
        });
      });
    },
  });

  return { data, isPending, isError, error, mutateAsync };
};
