import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { User } from '../../models';


@Injectable({ providedIn: 'root' })
export class UserService {

  private apiUrl = environment.apiUrl;
  private currentUser: User;
  private currentUserSub = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
    this.authenticationService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
      this.currentUserSub.next(user);
    });
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/users');
  }

  getCurrentUserObs(): Observable<User> {
    return this.currentUserSub.asObservable();
  }

  register(user): Observable<any> {
    return this.http.post(this.apiUrl + '/users/register', user);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/users/' + id);
  }

  update(user: any): Observable<any> {
    const updateRequest = this.http.put<any>(this.apiUrl + '/users/' + user._id , user)
    updateRequest.subscribe(
      (response) => {
        localStorage.setItem('currentUser', JSON.stringify(user as User));
        this.currentUser = user;
        this.currentUserSub.next(user);
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
    return updateRequest;
  }
}
