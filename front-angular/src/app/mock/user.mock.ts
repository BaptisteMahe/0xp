import { User } from '../../models';
import {SelectOption} from '../../models/SelectOption';

export const mockStudentUser = {
  id: '5f7207ee58e48426f8accbbb',
  username: 'test',
  password: 'testtest',
  firstName: 'testFirstName',
  name: 'testName',
  dateBirth: '1997-11-11',
  email: 'test@test.com',
  location: 'Marseille',
  softSkills: [],
  interestCompany: 'Orange',
  interestDomain: 'Dev',
  favoris: '',
  creationDate: '2020-09-28T15:57:34.468Z',
  contact: '0682318805',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI0NDQ1NTZ9.S2mwOQ8itzQIXNUfL_rdSQl17XNIovtVlePb8z7pPlU',
  isStudent: true,
  srcImage: '',
} as User;

export const mockCompanyUser = {
  telephone: '0682318707',
  email: 'test@test.com',
  dateBirth: '1997-11-11',
  firstName: 'testFirstName',
  password: 'testtest',
  contact: 'dsds',
  createdDate: '2020-09-29T14:58:03.389Z',
  creationDate: 'Invalid Date/undefined/undefined',
  description: 'Dev',
  idCompany: '5f734b7b42b67c276c2559d9',
  isStudent: false,
  location: 'Londres',
  name: 'testCompany',
  srcImage: '',
  taille: '101-1 000',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI2MDIzMzJ9.-JxK7YbpFaA56kaP6Lc1G494b5j3DMWb_SA8arD_zu4',
  username: 'testCompany',
  id: '5f734b7b42b67c276c2559d8',
  notifications: []
} as User;

export const mockAdminUser = {
  id: '5f7207ee58e48426f8accbbb',
  username: 'admin',
  password: 'testtest',
  firstName: 'testFirstName',
  name: 'testName',
  dateBirth: '1997-11-11',
  email: 'test@test.com',
  location: 'Marseille',
  softSkills: ['patience', 'organisation', 'motivation', 'empathie'],
  interestCompany: 'Orange',
  interestDomain: 'Dev',
  favoris: '',
  creationDate: '2020-09-28T15:57:34.468Z',
  contact: '0682318805',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI0NDQ1NTZ9.S2mwOQ8itzQIXNUfL_rdSQl17XNIovtVlePb8z7pPlU',
  isStudent: true,
  srcImage: '',
} as User;

export const mockSoftSkillList = [
  {_id: '5e53b8431c9d4400004cf2af', display: 'Patience', value: 'patience'},
  {_id: '5e53b8961c9d4400004cf2b1', display: 'Organisation', value: 'organisation'},
  {_id: '5e53bb5f1c9d4400004cf2b2', display: 'Motivation', value: 'motivation'},
  {_id: '5e6f8f5e1c9d44000087bc84', display: 'Empathie', value: 'empathie'},
  {_id: '5e6f8fa51c9d44000087bc85', display: 'Gestion du stress', value: 'gestion du stress'},
  {_id: '5e6f8fc11c9d44000087bc86', display: 'Sens du collectif', value: 'sens du collectif'},
  {_id: '5e6f90151c9d44000087bc87', display: 'Curiosité', value: 'curiosité'}
] as unknown as SelectOption[];
