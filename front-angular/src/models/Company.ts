import { SelectOption } from './SelectOption';

export interface Company {
  // tslint:disable-next-line:variable-name
  _id?: string;
  name: string;
  description?: string;
  location?: string;
  srcImage?: string;
  contact: string;
  category?: CompanyCategoryValue;
  isPartner: boolean;
  websiteUrl?: string;
}

export enum CompanyCategoryValue {
  TPE = 'TPE',
  PME = 'PME',
  ETI = 'ETI',
  GE = 'GE'
}

export const CompanyCategories: SelectOption[] = [
  { _id: CompanyCategoryValue.TPE, display: 'Très Petite Entreprise (< 10 salariés)' },
  { _id: CompanyCategoryValue.PME, display: 'Petite et Moyenne Entreprise (< 250 salariés)' },
  { _id: CompanyCategoryValue.ETI, display: 'Entreprise de Taille Intermédiaire (< 5000 salariés)' },
  { _id: CompanyCategoryValue.GE, display: 'Grande Entreprise (5000+ salariés)' }
];

export const ImageSize = {
  MaxWidth: 256,
  MaxHeight: 256
};
