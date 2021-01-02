import { SelectOption, SelectOptionCompany } from './SelectOption';

export class Offer {
  // tslint:disable-next-line:variable-name
  _id: string;
  title: string;
  type: OfferType;
  description: string;
  location: string;
  duration: OfferDuration;
  startDate: Date;
  remuneration: number;
  domains: SelectOption[];
  softSkills: SelectOption[];
  sector: SelectOption;
  company: SelectOptionCompany;
  createdDate: Date;
  matchingScore?: number;
}

export enum OfferType {
  Internship = 'Stage',
  SandwichCourse = 'Alternance',
  FirstJob = 'Premier Emploi'
}

export enum OfferDuration {
  OneToTwoMonths = '1-2 mois',
  SixMonths = '6 mois',
  TwoYears = '2 ans',
  CDI = 'CDI'
}
