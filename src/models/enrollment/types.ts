import { PersonModel } from '../person';
import { PlanModel } from '../plan';

export type EnrollmentModel = {
  id: number;
  beginDate: string;
  personId: number;
  person?: PersonModel;
  planId: number;
  plan?: PlanModel;
};
