import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Avis } from '../../models';

@Injectable({ providedIn: 'root' })
export class AvisService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Avis[]> {
    return this.httpClient.get<Avis[]>(this.apiUrl + '/avis');
  }

  add(avis: Avis): Observable<string> {
    return this.httpClient.post<string>(this.apiUrl + '/avis', avis);
  }

  getById(id: string): Observable<Avis> {
    return this.httpClient.get<Avis>(this.apiUrl + '/avis/' + id);
  }

  getAllByCompanyId(id: string): Observable<Avis[]> {
    return this.httpClient.get<Avis[]>(this.apiUrl + '/avis/company/' + id);
  }
}
