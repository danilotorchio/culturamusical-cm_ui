import { EntityStatus } from '../types';

export enum PlanPeriod {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  BIANNUAL = 'biannual',
  YEARLY = 'yearly',
}

export const PlanPeriodDescriptions: Record<PlanPeriod, string> = {
  [PlanPeriod.MONTHLY]: 'Mensal',
  [PlanPeriod.QUARTERLY]: 'Trimestral',
  [PlanPeriod.BIANNUAL]: 'Semestral',
  [PlanPeriod.YEARLY]: 'Anual',
};

export type PlanModel = {
  id: number;
  name: string;
  period: PlanPeriod;
  status: EntityStatus;
  value: number;
};
