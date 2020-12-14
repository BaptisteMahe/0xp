import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private apiUrl = environment.apiUrl;
  private currentUserSub = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private router: Router) {
      this.currentUserSub.next(JSON.parse(localStorage.getItem('currentUser')));
  }

  login(username, password) {
    return this.http.post<User>(this.apiUrl + '/users/authenticate', { username, password })
      .pipe(map((user: User) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSub.next(user);
        this.router.navigate(['/profile']);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSub.next(null);
  }

  getCurrentUserObs() {
      return this.currentUserSub.asObservable();
  }
}
