import { SelectOption } from './SelectOption';
import { OfferType, OfferDuration } from './Offer';

export class Filter {
  textInput: string;
  type: OfferType;
  duration: OfferDuration;
  sector: SelectOption;
  location: SelectOption[];
  company: SelectOption[];
  isPartner = false;
  createdDate: Date;
  companySize: string;
  startDate: Date;
  matchingMini: number;
  remunMini: number;
}
