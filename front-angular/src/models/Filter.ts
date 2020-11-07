export class Filter {
  textInput = '';
  type = '';
  duration = '';
  sector = '';
  location: string[] = [];
  company: string[] = [];
  isPartner = false;
  publicationDate = '';
  companySize = '';
  start_date: number;
  matchingMini = 0;
  remunMini = 0;

  toQuery() {
    let query = '';
    query += this.textInput !== '' ? 'textinput=' + this.textInput + '&' : '';
    query += this.type !== '' ? 'type=' + this.type + '&' : '';
    query += this.duration !== '' ? 'duration=' + this.duration + '&' : '';
    query += this.sector !== '' ? 'sector=' + this.sector + '&' : '';
    if (this.location.length !== 0) {
      query += 'location=';
      this.location.forEach((loc) => {
        query += loc + ';';
      });
      query += '&';
    }
    if (this.company.length !== 0) {
      query += 'company=';
      this.company.forEach((comp) => {
        query += comp + ';';
      });
      query += '&';
    }
    query += this.isPartner ? 'isPartner=true&' : '';
    query += this.publicationDate !== '' ? 'publicationDate=' + this.publicationDate + '&' : '';
    query += this.companySize !== '' ? 'companySize=' + this.companySize + '&' : '';
    query += this.start_date > (new Date()).getTime() ? 'start_date=' + this.start_date + '&' : '';
    query += this.matchingMini !== 0 ? 'matchingMini=' + this.matchingMini + '&' : '';
    query += this.remunMini !== 0 ? 'remunMini=' + this.remunMini + '&' : '';

    if (query !== '') {
      query = query.slice(0, query.length - 1);
    }
    return query;
  }
}
