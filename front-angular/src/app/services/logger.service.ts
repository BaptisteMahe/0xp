import { Injectable } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

import { OfferService } from './offer.service';

@Injectable({ providedIn: 'root' })
export class LoggerService {

  constructor(private router: Router,
              private offerService: OfferService) {
    this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      if (event.url.startsWith('/offers/')) {
        const offerId = event.url.replace('/offers/', '');
        this.offerService.addSingleView(offerId).subscribe(_ => {}, console.log);
      }
    });
  }
}
