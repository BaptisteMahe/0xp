import { SelectOption } from './SelectOption';
import { OfferType, OfferDuration, StudentTypeValue } from './Offer';

export interface Filter {
  textInput: string;
  type: OfferType;
  duration: OfferDuration;
  studentType: StudentTypeValue;
  sector: SelectOption;
  location: SelectOption[];
  startDate: Date;
  matchingMini: number;
  remunMini: number;
}

export enum OfferResearchType {
  Intern1A = 'Stage 1ère année',
  Intern2A = 'Stage 2ème année',
  InternGapYear = 'Stage de césure',
  SandwichCourse = 'Alternance',
  TFE = 'TFE',
  VIE = 'VIE',
  CDD = 'CDD',
  CDI = 'CDI'
}

export const OfferResearchToFilters = {
  Intern1A: {
    type: OfferType.Internship,
    duration: OfferDuration.OneToTwoMonths,
    studentType: StudentTypeValue['1A']
  },
  Intern2A: {
    type: OfferType.Internship,
    duration: OfferDuration.TwoToThreeMonths,
    studentType: StudentTypeValue['2A']
  },
  InternGapYear: {
    type: OfferType.Internship,
    duration: OfferDuration.FourToSixMonths,
    studentType: StudentTypeValue['2A']
  },
  SandwichCourse: {
    type: OfferType.SandwichCourse,
    duration: OfferDuration.OneToTwoYears,
    studentType: null
  },
  TFE: {
    type: OfferType.Internship,
    duration: OfferDuration.FourToSixMonths,
    studentType: StudentTypeValue['3A']
  },
  VIE: {
    type: OfferType.VIE,
    duration: null,
    studentType: null
  },
  CDD: {
    type: OfferType.CDD,
    duration: null,
    studentType: null
  },
  CDI: {
    type: OfferType.CDI,
    duration: null,
    studentType: StudentTypeValue['3A+']
  },
};

export function getKeyFromValue(offerSearchTypeValue: OfferResearchType): string {
  let key: string;
  Object.keys(OfferResearchType).forEach((currentKey) => {
    if (OfferResearchType[currentKey] === offerSearchTypeValue) {
      key = currentKey;
    }
  });
  return key;
}
