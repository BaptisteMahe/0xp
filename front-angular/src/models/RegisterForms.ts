import { Validators } from '@angular/forms';

export const studentRegisterForm = {
    firstName: ['', Validators.required],
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    dateBirth: ['', Validators.required],
    email: [''],
    telephone: [''],
    location: ['', Validators.required],
    softSkills: [''],
    interestCompany: [''],
    interestDomain: [''],
    isStudent: [true]
};

export const companyRegisterForm = {
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    isStudent: [false],
    creationDate: ['', Validators.required],
    description: ['', Validators.required],
    taille: ['', Validators.required],
    location: ['', Validators.required],
    srcImage: ['']
};
