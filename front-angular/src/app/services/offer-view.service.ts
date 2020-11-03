import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

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

  apiUrl = environment.apiUrl;

  listOffers: Offer[] = [];
  listOffersSubject = new BehaviorSubject<Offer[]>(null);

  filteredListOffers: Offer[] = [];
  filteredListOffersSubject = new BehaviorSubject<Offer[]>(null);

  isLoading = false;
  isLoadingSubject = new BehaviorSubject<boolean>(null);

  customListOffers: Offer[] = [];
  customListOffersSubject = new BehaviorSubject<Offer[]>(null);

  remunMax = 0;
  currentUser: User;

  constructor(private httpClient: HttpClient,
              private userService: UserService) {
    this.userService.getCurrentUserObs().subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  // TODO : Refactor this function
  fillListOffers() {
    this.emitIsLoadingSubject(true);
    this.httpClient.post<any>(this.apiUrl + '/offres', this.currentUser).subscribe(
      (response) => {
        this.listOffers = [];
        response.forEach((offerJson) => {
          const offer = new Offer();
          offer.fromHashMap(offerJson);
          this.listOffers.push(offer);
        });
        this.filteredListOffers = this.listOffers;
        this.emitListOffersSubject();
        this.emitFilteredListOffersSubject();
        this.emitIsLoadingSubject(false);
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  // TODO : Refactor this function
  filterListOffers(currentFilter: Filter) {
    this.emitIsLoadingSubject(true);
    const query = currentFilter.toQuery();
    if (query === '') {
      this.emitIsLoadingSubject(false);
      return;
    }

    this.httpClient.post<any>(this.apiUrl + '/offres/filtered?' + query, this.currentUser).subscribe(
      (response) => {
        this.filteredListOffers = [];
        console.log('Found ' + response.length + ' offers matching the filter');
        response.forEach((offerJson) => {
          const offer = new Offer();
          offer.fromHashMap(offerJson);
          this.filteredListOffers.push(offer);
        });
        this.emitFilteredListOffersSubject();
        this.emitIsLoadingSubject(false);
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  emitListOffersSubject() {
    this.sortArray(this.listOffers, SortCategory.matchingScore);
    this.listOffersSubject.next(this.listOffers.length !== 0 ? this.listOffers.slice() : []);
  }

  emitFilteredListOffersSubject() {
    this.sortArray(this.filteredListOffers, SortCategory.matchingScore);
    this.filteredListOffersSubject.next(this.filteredListOffers.length !== 0 ? this.filteredListOffers.slice() : []);
  }

  emitIsLoadingSubject(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
  }

  emitCustomListOffersSubject() {
    this.customListOffersSubject.next(this.customListOffers.length !== 0 ? this.customListOffers.slice() : []);
  }

  filter(currentFilter: Filter) {
    if (currentFilter.toQuery() !== '') {
      this.filterListOffers(currentFilter);
    } else {
      this.fillListOffers();
    }
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

  // TODO : Refactor this function
  getListOfferByCompanyId() {
    if (this.currentUser.username === 'admin') {
      this.httpClient.get<any>(this.apiUrl + '/offres').subscribe(
        (response) => {
          this.customListOffers = [];
          response.forEach((offerJson) => {
            const offer = new Offer();
            offer.fromHashMap(offerJson);
            this.customListOffers.push(offer);
          });
          this.emitCustomListOffersSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    } else {
      this.httpClient.get<any>(this.apiUrl + '/offres/byCompanyId?id=' + this.currentUser.idCompany).subscribe(
        (response) => {
          this.customListOffers = [];
          console.log('Found ' + response.length + ' offers matching the company');
          response.forEach((offerJson) => {
            const offer = new Offer();
            offer.fromHashMap(offerJson);
            this.customListOffers.push(offer);
          });
          this.emitCustomListOffersSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
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

  addOffer(offer: Offer): Observable<any> {
    return this.httpClient.post<Offer>(this.apiUrl + '/offres/post', offer);
  }

  deleteOffer(id: string): Observable<any> {
    return this.httpClient.delete<string>(this.apiUrl + '/offres/deleteById/' + id);
  }

  editOffer(offer: Offer): Observable<any> {
    return this.httpClient.post<Offer>(this.apiUrl + '/offres/update', offer);
  }
}
