export class Company {
  // tslint:disable-next-line:variable-name
  _id?: string;
  name: string;
  description?: string;
  location?: string;
  srcImage?: string;
  contact: string;
  size?: CompanySize;
  isPartner: boolean;
  creationDate?: Date;
}

export enum CompanySize {
  Small = '1-10',
  Medium = '10-100',
  Large = '100-1000',
  Huge = '1000+'
}
