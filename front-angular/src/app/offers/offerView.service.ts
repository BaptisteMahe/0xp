import { Injectable } from '@angular/core';
import { Offer } from '../../models/Offer';
import { Subject } from 'rxjs/Subject';
import { Filter } from 'src/models/Filter';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../logging/services';
import { Observable } from 'rxjs';

@Injectable()
export class OfferViewService {


  apiUrl = environment.apiUrl;

  listOffers: Offer[] = [];
  listOffersSubject = new Subject<Offer[]>();

  filteredListOffers: Offer[] = [];
  filteredListOffersSubject = new Subject<Offer[]>();

  isLoading = false;
  isLoadingSubject = new Subject<boolean>();

  customListOffers: Offer[] = [];
  customListOffersSubject = new Subject<Offer[]>();

  remunMax = 0;
  currentUser: any;
  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

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
    this.sortArray(this.listOffers, 'matchingScore');
    this.listOffersSubject.next(this.listOffers.length !== 0 ? this.listOffers.slice() : []);
  }

  emitFilteredListOffersSubject() {
    this.sortArray(this.filteredListOffers, 'matchingScore');
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

  sortArray(array: Offer[], key: string) {
    if (key === 'matchingScore') {
      array.sort((a: Offer, b: Offer) => {
        return +b.matchingScore - +a.matchingScore;
      });
    } else if (key === 'remuneration') {
      array.sort((a: Offer, b: Offer) => {
        return +b.remuneration - +a.remuneration;
      });
    } else if (key === 'created_date') {
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
          console.log(this.currentUser.idCompany);
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
