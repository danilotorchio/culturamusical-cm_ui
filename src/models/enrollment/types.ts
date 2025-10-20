import { EntityStatus } from '../types';

export type EnrollmentModel = {
  enrollmentId: number;
  personId: number;
  personName: string;
  planName: string;
  beginDate: Date;
  endDate: Date;
  status: EntityStatus;
};

export type EnrollmentCreateDto = {
  planId: number;
  beginDate: Date;

  personId: number | undefined;
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  birthDate: Date | undefined;
};
