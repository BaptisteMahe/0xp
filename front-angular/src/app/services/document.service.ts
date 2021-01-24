import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Document } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getById(id: string): Observable<Document> {
    return this.httpClient.get<Document>(this.apiUrl + '/documents/' + id);
  }

  add(document: Document): Observable<string> {
    return this.httpClient.post<string>(this.apiUrl + '/documents', document);
  }

  update(document: Document): Observable<string> {
    return this.httpClient.put<string>(this.apiUrl + '/documents/' + document._id, document);
  }

  deleteById(id: string): Observable<any> {
    return this.httpClient.delete<Document>(this.apiUrl + '/documents/' + id);
  }
}
