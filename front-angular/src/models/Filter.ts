import { SelectOption } from './SelectOption';

export class Filter {
  textInput = '';
  type = '';
  duration = '';
  sector = '';
  location: SelectOption[] = [];
  company: SelectOption[] = [];
  isPartner = false;
  publicationDate = '';
  companySize = '';
  start_date: number;
  matchingMini = 0;
  remunMini = 0;
}
