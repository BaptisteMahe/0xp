import { SelectOption, SelectOptionCompany } from './SelectOption';

export interface Offer {
  // tslint:disable-next-line:variable-name
  _id: string;
  title: string;
  type: OfferType;
  description: string;
  profileDescription: string;
  location: string;
  duration: OfferDuration;
  startDate: Date;
  remuneration: number;
  domains: SelectOption[];
  sector: SelectOption;
  company: SelectOptionCompany;
  createdDate: Date;
  studentTypes: StudentTypeValue[];
  pdfId?: string;
  matchingScore?: number;
  isValidated: boolean;
}

export enum OfferType {
  Internship = 'Stage',
  SandwichCourse = 'Alternance',
  VIE = 'VIE',
  CDI = 'CDI',
  CDD = 'CDD'
}

export enum OfferDuration {
  OneToTwoMonths = '1-2 mois',
  TwoToThreeMonths = '2-3 mois',
  FourToSixMonths = '4-6 mois',
  OneToTwoYears = '1-2 ans',
  CDI = 'CDI'
}

export enum StudentTypeValue {
  '1A' = '1A',
  '2A' = '2A',
  '3A' = '3A',
  '3A+' = '3A+'
}

export const StudentTypes: SelectOption[] = [
  { _id: StudentTypeValue['1A'], display: 'Élève en 1ère année' },
  { _id: StudentTypeValue['2A'], display: 'Élève en 2ème année' },
  { _id: StudentTypeValue['3A'], display: 'Élève en 3ème année' },
  { _id: StudentTypeValue['3A+'], display: 'Élève diplomé' }
];
