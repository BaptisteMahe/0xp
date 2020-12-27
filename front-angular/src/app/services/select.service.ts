import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { SelectOption } from '../../models';

@Injectable()
export class SelectService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getSectors(): Observable<SelectOption[]> {
    return this.httpClient.get<SelectOption[]>(this.apiUrl + '/select/sectors');
  }

  getSoftSkills(): Observable<SelectOption[]> {
    return this.httpClient.get<SelectOption[]>(this.apiUrl + '/select/softSkills');
  }

  getDomains(): Observable<SelectOption[]> {
    return this.httpClient.get<SelectOption[]>(this.apiUrl + '/select/domains');
  }

  getCompaniesForSelect(): Observable<SelectOption[]> {
    return this.httpClient.get<SelectOption[]>(this.apiUrl + '/select/companies');
  }

  getLocations(): Observable<SelectOption[]> {
    return this.httpClient.get<SelectOption[]>(this.apiUrl + '/select/locations');
  }
}
