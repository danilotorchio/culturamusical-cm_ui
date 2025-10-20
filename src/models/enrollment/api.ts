import { EnrollmentCreateDto, EnrollmentModel } from './types';

type GetEnrollments = () => Promise<EnrollmentModel[]>;

export const getEnrollments: GetEnrollments = async (): Promise<EnrollmentModel[]> => {
  const endpoint = '/api/enrollments';

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Falha ao buscar matrículas. Por favor, tente novamente em alguns instantes.');
    }
    return response.json();
  } catch (error) {
    console.error('Client: failed to get enrollments', error);
    throw error;
  }
};

type PostEnrollment = (data: EnrollmentCreateDto) => Promise<EnrollmentModel>;

export const postEnrollment: PostEnrollment = async (data): Promise<EnrollmentModel> => {
  const endpoint = '/api/enrollments';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error) {
    console.error('Client: failed to post enrollment', error);
    throw error;
  }
};

type PostRenewEnrollment = (enrollmentId: number) => Promise<EnrollmentModel>;

export const postRenewEnrollment: PostRenewEnrollment = async (enrollmentId): Promise<EnrollmentModel> => {
  const endpoint = `/api/enrollments/renew?enrollmentId=${enrollmentId}`;

  try {
    const response = await fetch(endpoint, { method: 'POST' });
    return response.json();
  } catch (error) {
    console.error('Client: failed to renew enrollment', error);
    throw error;
  }
};
