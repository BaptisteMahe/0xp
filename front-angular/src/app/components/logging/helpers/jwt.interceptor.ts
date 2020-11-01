import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from '../../../services';
import { User } from '../../../../models';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    private currentUser: User;
    
    constructor(private userService: UserService) {
        this.userService.getCurrentUserObs().subscribe((user: User) => {
            this.currentUser = user;
        });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.currentUser?.token) {
            request = request.clone({
                setHeaders: {Authorization: `Bearer ${this.currentUser.token}`}
            });
        }

        return next.handle(request);
    }
}
