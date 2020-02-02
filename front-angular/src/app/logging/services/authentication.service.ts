import { UserCompany } from './../../../models/userCompany';
import { UserStudent } from './../../../models/userStudent';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

import { User } from '../../../models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    apiUrl = environment.apiUrl;
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient,
                private router: Router) {
        //TODO : any à la place de user ? Ou classe user générique avec user entre student et compagnie
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    //TODO : pareil
    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(this.apiUrl + '/users/authenticate', { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                this.router.navigate(['/profile']);
                //TODO recupérer l'entreprise qui va bien avec user.idCompany
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
