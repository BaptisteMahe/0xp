import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserService } from '../../services';
import { User } from '../../../models';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    private currentUser: User;

    constructor(
        private router: Router,
        private userService: UserService) {
        this.userService.getCurrentUserObs().subscribe((user: User) => {
            this.currentUser = user;
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.currentUser) {
            return true;
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}
