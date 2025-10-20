import { PersonModel } from './types';

type GetPeople = () => Promise<PersonModel[]>;

export const getPeople: GetPeople = async (): Promise<PersonModel[]> => {
  const endpoint = '/api/people/students';

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Failed to fetch people');
    }
    return response.json();
  } catch (error) {
    console.error('Client: failed to get people', error);
    throw error;
  }
};
