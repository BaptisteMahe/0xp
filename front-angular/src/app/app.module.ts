import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { HomeComponent } from './components/home/home.component';

import { NavbarComponent } from './components/navbar/navbar.component';

import { ProfileAdminComponent } from './components/admin/profile-admin/profile-admin.component';

import { FaqComponent } from './components/faq/faq.component';
import { FaqQuestionComponent } from './components/faq/faq-question/faq-question.component';

import { LoggingComponent } from './components/logging/logging.component';
import { RegisterFormComponent } from './components/logging/register-form/register-form.component';
import { ErrorInterceptor, JwtInterceptor } from './components/logging/helpers';

import { OffersComponent } from './components/offers/offers.component';
import { FilterComponent } from './components/offers/filter/filter.component';
import { OfferPreviewComponent } from './components/offers/offer-preview/offer-preview.component';
import { OfferDetailComponent } from './components/offers/offer-detail/offer-detail.component';
import { OfferViewService } from './services';

import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDetailComponent } from './components/profile/profile-detail/profile-detail.component';
import { NotificationComponent } from './components/profile/notification/notification.component';
import { OfferSquareComponent } from './components/profile/application/offer-square/offer-square.component';
import { OfferCompanyComponent, DeleteDialogContentComponent } from './components/profile/application/offer-company/offer-company.component';
import { AddOfferComponent, QuitEditionDialogContentComponent } from './components/profile/application/offer-company/add-offer/add-offer.component';
import { NotificationsService } from './components/profile/notification/notifications.service';

import { EntreprisesComponent } from './components/entreprises/entreprises.component';
import { DetailCompanyComponent } from './components/entreprises/detail-company/detail-company.component';
import { AvisCompanyComponent } from './components/entreprises/avis-company/avis-company.component';
import { AddCompanyComponent } from './components/entreprises/add-company/add-company.component';
import { ListCompanyComponent } from './components/entreprises/list-company/list-company.component';
import { AvisOverviewComponent } from './components/entreprises/avis-company/avis-overview/avis-overview.component';

import { CompanyService, UserService } from './services';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './modules/material.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    OffersComponent,
    LoggingComponent,
    ProfileComponent,
    FilterComponent,
    OfferPreviewComponent,
    OfferDetailComponent,
    RegisterFormComponent,
    ProfileDetailComponent,
    NotificationComponent,
    OfferSquareComponent,
    OfferCompanyComponent,
    FaqComponent,
    AddOfferComponent,
    FaqQuestionComponent,
    EntreprisesComponent,
    DetailCompanyComponent,
    AvisCompanyComponent,
    ProfileAdminComponent,
    AddCompanyComponent,
    ListCompanyComponent,
    DeleteDialogContentComponent,
    QuitEditionDialogContentComponent,
    AvisOverviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule
  ],
  entryComponents: [
    DeleteDialogContentComponent,
    QuitEditionDialogContentComponent
  ],
  exports: [OfferDetailComponent],
  providers: [OfferViewService, CompanyService, UserService, NotificationsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
