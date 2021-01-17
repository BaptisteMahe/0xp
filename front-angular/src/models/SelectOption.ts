export interface SelectOption {
  // tslint:disable-next-line:variable-name
  _id: string;
  display: string;
}

export interface SelectOptionCompany extends SelectOption {
  srcImg?: string;
}
