import { EntreprisesComponent } from './entreprises/entreprises.component';
import { FaqComponent } from './faq/faq.component';
import { RegisterFormComponent } from './logging/register-form/register-form.component';
import { LoggingComponent } from './logging/logging.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OffersComponent } from './offers/offers.component';
import { ProfileComponent } from './profile/profile.component';
import { OfferDetailComponent } from './offers/offer-detail/offer-detail.component';
import { AddOfferComponent } from './profile/application/offer-company/add-offer/add-offer.component';

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
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }