import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Company } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable()
export class CompanyService {

    constructor(private http: HttpClient) { }

    apiUrl = environment.apiUrl;

    getAll() {
        return this.http.get<Company[]>(this.apiUrl + '/companies');
    }

    getById(id: any) {
        return this.http.get<Company>(this.apiUrl + '/companies/' + id);
    }

    addCompany(company: Company) {
        return this.http.post<Company>(this.apiUrl + '/companies', company);
    }
}
