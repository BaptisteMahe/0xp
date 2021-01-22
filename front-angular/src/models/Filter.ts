import { SelectOption } from './SelectOption';
import { OfferType, OfferDuration } from './Offer';
import { CompanyCategoryValue } from './Company';

export interface Filter {
  textInput: string;
  type: OfferType;
  duration: OfferDuration;
  sector: SelectOption;
  location: SelectOption[];
  company: SelectOption[];
  isPartner: boolean;
  createdDate: Date;
  companyCategory: CompanyCategoryValue;
  startDate: Date;
  matchingMini: number;
  remunMini: number;
}
