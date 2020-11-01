import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { SelectOption, User } from '../../models';


@Injectable({ providedIn: 'root' })
export class UserService {

  public apiUrl = environment.apiUrl;
  private currentUser: User;
  private currentUserSub = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
    this.authenticationService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
      this.currentUserSub.next(user);
    });
  }

  getAll() {
    return this.http.get<User[]>(this.apiUrl + '/users');
  }

  getCurrentUserObs() {
    return this.currentUserSub.asObservable();
  }

  register(user: User) {
    return this.http.post(this.apiUrl + '/users/register', user);
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl + '/users/' + id);
  }

  update(user: any) {
    this.http.post<any>(this.apiUrl + '/users/update', { user }).subscribe(
      (response) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;
        this.currentUserSub.next(user);
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
