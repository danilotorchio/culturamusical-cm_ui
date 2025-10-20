export enum PersonType {
  STUDENT = 'student',
}

export type PersonModel = {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  type: PersonType;
};
