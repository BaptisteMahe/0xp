import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class FaqService {

    private apiUrl = environment.apiUrl;

    constructor(private http : HttpClient) { }

    getFaq() { 
        return this.http.get(this.apiUrl + '/faq');
    }

    postFaq(faq) {
        return this.http.post(this.apiUrl + '/faq', faq);
    }
}