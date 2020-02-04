import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Company } from '../models/Company';
import { environment } from 'src/environments/environment';

@Injectable()
export class CompanyService {


    constructor(private http: HttpClient) {}

    apiUrl = environment.apiUrl;

    getAll() {
        return this.http.get<Company[]>(this.apiUrl + '/companies');
    }

    getById(id: any) {
        return this.http.get<Company>(this.apiUrl + '/companies/'+id)
    }

}