import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Offer, User, Filter } from '../../models';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';


export enum SortCategory {
  matchingScore,
  remuneration,
  createdDate
}

@Injectable()
export class OfferService {

  private apiUrl = environment.apiUrl;
  private currentUser: User;

  constructor(private httpClient: HttpClient,
              private userService: UserService) {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  getFilteredOffers(filter: Filter): Observable<Offer[]> {
    return this.httpClient.post<Offer[]>(this.apiUrl + '/offers/filter', { user: this.currentUser, filter });
  }

  getAllOffers(isValidated: boolean = true): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(this.apiUrl + '/offers?isValidated=' + isValidated );
  }

  getOfferById(id: string): Observable<Offer> {
    return this.httpClient.get<Offer>(this.apiUrl + '/offers/' + id);
  }

  getAllOffersByCompanyId(companyId: string): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(this.apiUrl + '/offers/byCompanyId/' + companyId);
  }

  addOffer(offer: Offer): Observable<any> {
    return this.httpClient.post<Offer>(this.apiUrl + '/offers/', offer);
  }

  validateOffer(id: string): Observable<string> {
    return this.httpClient.get<string>(this.apiUrl + '/offers/validate/' + id);
  }

  deleteOffer(id: string): Observable<string> {
    return this.httpClient.delete<string>(this.apiUrl + '/offers/' + id);
  }

  editOffer(offer: Offer): Observable<Offer> {
    return this.httpClient.put<Offer>(this.apiUrl + '/offers/' + offer._id, offer);
  }

  addSingleView(id: string): Observable<string> {
    return this.httpClient.get<string>(this.apiUrl + '/offers/addView/' + id);
  }

  sortArray(array: Offer[], key: SortCategory) {
    if (key === SortCategory.matchingScore) {
      array.sort((a: Offer, b: Offer) => {
        return +b.matchingScore - +a.matchingScore;
      });
    } else if (key === SortCategory.remuneration) {
      array.sort((a: Offer, b: Offer) => {
        return +b.remuneration - +a.remuneration;
      });
    } else if (key === SortCategory.createdDate) {
      array.sort((a: Offer, b: Offer) => {
        return +b.createdDate - +a.createdDate;
      });
    }
  }

  // TODO : Remake that shit
  defineColor(percentage: number) {
    percentage = +percentage / 100;
    const percentColors = [
      { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
      { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
      { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } }];

    for (var i = 1; i < percentColors.length - 1; i++) {
      if (percentage < percentColors[i].pct) {
        break;
      }
    }
    const lower = percentColors[i - 1];
    const upper = percentColors[i];
    const range = upper.pct - lower.pct;
    const rangePct = (+percentage - lower.pct) / range;
    const pctLower = 1 - rangePct;
    const pctUpper = rangePct;
    const color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
  }
}
