import { Validators } from '@angular/forms';
import { UserType } from './User';

export const studentRegisterForm = {
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    firstName: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telephone: [''],
    type: [UserType.Student]
};

export const companyRegisterForm = {
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', Validators.required],
    companyName: ['', Validators.required],
    description: [''],
    size: [''],
    srcImage: [''],
    type: [UserType.Company]
};
