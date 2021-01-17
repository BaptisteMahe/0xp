import { SelectOption } from './SelectOption';

export type User = UserAdmin | UserStudent | UserCompany;

export interface UserAdmin extends BaseUser {
  type: UserType.Admin;
}

export interface UserStudent extends BaseUser {
  type: UserType.Student;
  firstName: string;
  name: string;
  softSkills: SelectOption[];
  telephone?: string;
  email: string;
}

export interface UserCompany extends BaseUser {
  type: UserType.Company;
  companyId: string;
  email: string;
  telephone?: string;
}

interface BaseUser {
  // tslint:disable-next-line:variable-name
  _id: string;
  username: string;
  token: string;
  type: UserType;
}

export enum UserType {
  Admin = 'admin',
  Student = 'student',
  Company = 'company'
}
