import { PlanModel } from './types';

type GetPlans = () => Promise<PlanModel[]>;

export const getPlans: GetPlans = async (): Promise<PlanModel[]> => {
  const endpoint = '/api/plans';

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Falha ao buscar planos. Por favor, tente novamente em alguns instantes.');
    }
    return response.json();
  } catch (error) {
    console.error('Client: failed to get plans', error);
    throw error;
  }
};

type PostPlan = (data: Omit<PlanModel, 'id' | 'status' | 'value'>) => Promise<PlanModel>;

export const postPlan: PostPlan = async (planData): Promise<PlanModel> => {
  const endpoint = '/api/plans';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(planData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || 'Falha ao criar plano');
    }

    return responseData as PlanModel;
  } catch (error) {
    console.error('Client: failed to post plan', error);
    throw error;
  }
};

type PatchPlan = (data: PlanModel) => Promise<PlanModel>;

export const putPlan: PatchPlan = async (data): Promise<PlanModel> => {
  const endpoint = '/api/plans';

  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || 'Falha ao atualizar plano');
    }

    return responseData as PlanModel;
  } catch (error) {
    console.error('Client: failed to patch plan', error);
    throw error;
  }
};
