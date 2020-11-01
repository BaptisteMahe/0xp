import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailCompanyComponent } from './components/entreprises/detail-company/detail-company.component';
import { EntreprisesComponent } from './components/entreprises/entreprises.component';
import { FaqComponent } from './components/faq/faq.component';
import { RegisterFormComponent } from './components/logging/register-form/register-form.component';
import { LoggingComponent } from './components/logging/logging.component';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OfferDetailComponent } from './components/offers/offer-detail/offer-detail.component';
import { AddOfferComponent } from './components/profile/application/offer-company/add-offer/add-offer.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoggingComponent},
  { path: 'register', component: RegisterFormComponent},
  { path: 'offers', component: OffersComponent },
  { path: 'offers/:id', component: OfferDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'addOffer', component: AddOfferComponent },
  { path: 'companies', component: EntreprisesComponent},
  { path: 'companies/:id', component: DetailCompanyComponent},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
