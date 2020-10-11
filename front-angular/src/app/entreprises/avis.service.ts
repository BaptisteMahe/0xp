import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Avis } from '../../models';

@Injectable({ providedIn: 'root' })
export class AvisService {
  constructor(private http: HttpClient) { }

  apiUrl = environment.apiUrl;

  getAll() {
    return this.http.get<Avis[]>(this.apiUrl + '/avis');
  }

  // TODO : this function should only have an Avis in parameter
  add(form: any, idCompany: string) {
    let avis = new Avis();
    avis.description = form.avis.value;
    avis.idCompany = idCompany;
    avis.noteGenerale = form.noteGenerale.value;
    avis.noteInteret = form.noteInteret.value;
    avis.noteAmbiance = form.noteAmbiance.value;
    avis.noteEncadrt = form.noteEncadrt.value;
    return this.http.post(this.apiUrl + '/avis', avis);
  }

  getById(id: any) {
    return this.http.get<Avis>(this.apiUrl + '/avis/' + id);
  }

  getAllByCompanyId(id: any) {
    return this.http.get<Avis[]>(this.apiUrl + '/avis/company/' + id);
  }
}
