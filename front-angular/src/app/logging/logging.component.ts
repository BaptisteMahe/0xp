import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';

import { AuthenticationService, UserService } from '../services';
import { User } from '../../models';

@Component({
    selector: 'app-logging',
    templateUrl: './logging.component.html',
    styleUrls: ['./logging.component.scss']
})
export class LoggingComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private matSnackBar: MatSnackBar
    ) {
        let currentUser: User;
        this.userService.getCurrentUserObs().subscribe((user: User) => {
            currentUser = user;
        });
        if (currentUser) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.matSnackBar.open('Login successful', null, { duration: 3000, panelClass: ['snack-bar-sucess'] });
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.matSnackBar.open(error, null, { duration: 3000, panelClass: ['snack-bar-error'] });
                    this.loading = false;
                });
    }
}
