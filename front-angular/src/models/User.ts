export interface User {
  id: string;
  idCompany?: string;
  username: string;
  password: string;
  firstName: string;
  name: string;
  dateBirth: string;
  email: string;
  telephone: string;
  location: string;
  softSkills?: string[];
  interestCompany?: string;
  interestDomain?: string;
  favoris?: string;
  creationDate: string;
  description: string;
  taille: string;
  contact: string;
  token: string;
  isStudent: boolean;
  srcImage?: string;
  notifications: any[];
}

export interface GenericUser {
  id: string;
  token: string;
  username: string;
  email: string;
}
