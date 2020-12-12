import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Offer, User, Filter } from '../../models';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';


export enum SortCategory {
  matchingScore,
  remuneration,
  created_date
}

@Injectable()
export class OfferViewService {

  private apiUrl = environment.apiUrl;
  private currentUser: User;

  constructor(private httpClient: HttpClient,
              private userService: UserService) {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  getFullListOffer(): Observable<Offer[]> {
    return this.getAllOffers().pipe(
        map(listOfferJson => {
          return this.getOfferListFromHashMap(listOfferJson);
        })
    );
  }

  getFilteredListOffer(filter: Filter): Observable<Offer[]> {
    const query = filter.toQuery();
    if (query) {
      return this.getFilteredOffer(query).pipe(
          map(listOfferJson => {
            return this.getOfferListFromHashMap(listOfferJson);
          })
      );
    } else {
      return this.getFullListOffer();
    }
  }

  getListOfferByCompanyId(id: string): Observable<Offer[]> {
    return this.getAllOffersByCompanyId(id).pipe(
        map(listOfferJson => {
          return this.getOfferListFromHashMap(listOfferJson);
        })
    );
  }

  getOfferListFromHashMap(listOfferJson): Offer[] {
    const listOffer: Offer[] = [];
    listOfferJson.forEach(offerJson => {
      const offer = new Offer();
      offer.fromHashMap(offerJson);
      listOffer.push(offer);
    });
    return listOffer;
  }

  getFilteredOffer(query): Observable<any[]> {
    // TODO : Change this request to get in BackEnd
    return this.httpClient.post<any>(this.apiUrl + '/offres/filtered?' + query, this.currentUser);
  }

  getAllOffers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/offres');
  }

  getOfferById(id: string): Observable<Offer> {
    return this.httpClient.get<Offer>(this.apiUrl + '/offres/byId/' + id);
  }

  getAllOffersByCompanyId(companyId: string): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl + '/offres/byCompanyId?id=' + companyId);
  }

  addOffer(offer: Offer): Observable<any> {
    return this.httpClient.post<Offer>(this.apiUrl + '/offres/post', offer);
  }

  deleteOffer(id: string): Observable<any> {
    return this.httpClient.delete<string>(this.apiUrl + '/offres/deleteById/' + id);
  }

  editOffer(offer: Offer): Observable<any> {
    return this.httpClient.put<Offer>(this.apiUrl + '/offres/update', offer);
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
    } else if (key === SortCategory.created_date) {
      array.sort((a: Offer, b: Offer) => {
        return +b.created_date - +a.created_date;
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
