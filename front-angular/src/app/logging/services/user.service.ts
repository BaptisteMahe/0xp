import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../../models';
import {SelectOption} from '../../../models/SelectOption';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  public apiUrl = environment.apiUrl;

  getAll() {
    return this.http.get<User[]>(this.apiUrl + '/users');
  }

  register(user: User) {
    return this.http.post(this.apiUrl + '/users/register', user);
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl + '/users/' + id);
  }

  update(user: any) {
    this.http.post<any>(this.apiUrl + '/users/update', { user: user }).subscribe(
      (response) => {
        console.log('Profil modifié');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  getSoftSkillList() {
    return this.http.get<SelectOption[]>(this.apiUrl + '/select/softSkills');
  }
}
