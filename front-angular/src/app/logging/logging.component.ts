import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { GlobalService } from '../services/global.service';


@Component({
    selector: 'app-logging',
    templateUrl: './logging.component.html',
    styleUrls: ['./logging.component.scss']
})
export class LoggingComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private globalService: GlobalService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
        this.globalService.switchIsProfilOpen(true);
    }

    ngOnDestroy() {
        this.globalService.switchIsProfilOpen(false);
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
