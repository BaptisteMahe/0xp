import { User } from '../../models/user';

export const mockStudentUser = {
  id: '5f7207ee58e48426f8accbbb',
  username: 'test',
  password: 'testtest',
  firstName: 'testFirstName',
  name: 'testName',
  dateBirth: '1997-11-11',
  contactMail: 'test@test.com',
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
