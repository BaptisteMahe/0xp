import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { SelectOption, SelectOptionCompany } from '../../models';

@Injectable()
export class SelectService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getSectors(): Observable<SelectOption[]> {
    return this.httpClient.get<SelectOption[]>(this.apiUrl + '/select/sectors');
  }

  getDomains(): Observable<SelectOption[]> {
    return this.httpClient.get<SelectOption[]>(this.apiUrl + '/select/domains');
  }

  getCompaniesForSelect(): Observable<SelectOptionCompany[]> {
    return this.httpClient.get<SelectOptionCompany[]>(this.apiUrl + '/select/companies/true');
  }

  getLocations(): Observable<SelectOption[]> {
    return this.httpClient.get<SelectOption[]>(this.apiUrl + '/select/locations');
  }
}
