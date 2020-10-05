interface OfferData {
  _id: string;
  title: string;
  id_company: string;
  srcImgCompany: string;
  company: string;
  location: string;
  start_date: string;
  created_date: string;
  sector: string;
  type: string;
  description: string;
  remuneration: number;
  duration: string;
  softSkills: string[];
  domains: string[];
  matchingScore: any;
}

export class Offer {
  id: string;
  title = '';
  company = '';
  id_company = '';
  srcImgCompany = '';
  location = '';
  start_date = '';
  created_date = '';
  sector = '';
  type = '';
  description = '';
  remuneration: number;
  duration = '';
  softSkills: string[];
  domains: string[];
  matchingScore: any;

  fromHashMap(data: OfferData) {
    this.id = String(data._id);
    this.title = String(data.title);
    this.id_company = String(data.id_company);
    this.srcImgCompany = String(data.srcImgCompany);
    this.company = String(data.company);
    this.location = String(data.location);
    this.start_date = String(data.start_date);
    this.created_date = String(data.created_date);
    this.sector = String(data.sector);
    this.type = String(data.type);
    this.description = String(data.description);
    this.remuneration = Number(data.remuneration);
    this.duration = String(data.duration);
    this.softSkills = data.softSkills;
    this.domains = data.domains;
    this.matchingScore = data.matchingScore;
  }

  isValid() {
    if (this.title === '' || this.sector === '' || this.type === '' || this.description === '' || this.location === '') {
      return false;
    }
    return true;
  }
}