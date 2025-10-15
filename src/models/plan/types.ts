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

export enum PlanStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const PlanStatusDescriptions: Record<PlanStatus, string> = {
  [PlanStatus.ACTIVE]: 'Ativo',
  [PlanStatus.INACTIVE]: 'Inativo',
};

export type PlanModel = {
  id: number;
  name: string;
  period: PlanPeriod;
  status: PlanStatus;
  value: number;
};
