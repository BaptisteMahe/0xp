import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Company } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable()
export class CompanyService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Company[]>(this.apiUrl + '/companies');
    }

    getById(id: any) {
        return this.http.get<Company>(this.apiUrl + '/companies/' + id);
    }

    deleteById(id: any) {
        return this.http.delete<Company>(this.apiUrl + '/companies/' + id);
    }

    addCompany(company: Company) {
        return this.http.post<Company>(this.apiUrl + '/companies', company);
    }

    editCompany(company: Company) {
        return this.http.put<Company>(this.apiUrl + '/companies/' + company._id, company);
    }
}
