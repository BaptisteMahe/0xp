export interface Company {
  // tslint:disable-next-line:variable-name
  _id?: string;
  name: string;
  description?: string;
  location?: string;
  srcImage?: string;
  contact: string;
  size?: CompanySize;
  isPartner: boolean;
}

export enum CompanySize {
  Small = '1-10',
  Medium = '10-100',
  Large = '100-1000',
  Huge = '1000+'
}

export const ImageSize = {
  MaxWidth: 256,
  MaxHeight: 256
};
