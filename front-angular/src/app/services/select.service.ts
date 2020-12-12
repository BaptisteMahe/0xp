import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class SelectService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getSectors(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/select/sectors');
  }

  getSoftSkills(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/select/softskills');
  }

  getDomains(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/select/domaines');
  }
}
