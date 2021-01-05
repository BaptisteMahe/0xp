import { SelectOption } from './SelectOption';

export interface User {
  // tslint:disable-next-line:variable-name
  _id: string;
  username: string;
  token: string;
  type: UserType;
}

export class UserAdmin implements User {
  // tslint:disable-next-line:variable-name
  _id: string;
  username: string;
  token: string;
  type: UserType;
}

export class UserStudent implements User {
  // tslint:disable-next-line:variable-name
  _id: string;
  username: string;
  token: string;
  type: UserType;

  firstName: string;
  name: string;
  softSkills: SelectOption[];
  telephone?: string;
  email?: string;
}

export class UserCompany implements User {
  // tslint:disable-next-line:variable-name
  _id: string;
  username: string;
  token: string;
  type: UserType;

  companyId: string;
  email: string;
  telephone?: string;
}

export enum UserType {
  Admin = 'admin',
  Student = 'student',
  Company = 'company'
}
