import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { HomeComponent } from './home/home.component';

import { NavbarComponent } from './navbar/navbar.component';

import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';

import { FaqComponent } from './faq/faq.component';
import { FaqQuestionComponent } from './faq/faq-question/faq-question.component';

import { LoggingComponent } from './logging/logging.component';
import { ErrorInterceptor } from './logging/helpers/error.interceptor';
import { JwtInterceptor } from './logging/helpers/jwt.interceptor';
import { RegisterFormComponent } from './logging/register-form/register-form.component';
import { UserService } from './logging/services/user.service';

import { OffersComponent } from './offers/offers.component';
import { FilterComponent } from './offers/filter/filter.component';
import { OfferPreviewComponent } from './offers/offer-preview/offer-preview.component';
import { OfferDetailComponent } from './offers/offer-detail/offer-detail.component';
import { OfferViewService } from './offers/offerView.service';

import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { NotificationComponent } from './profile/notification/notification.component';
import { OfferSquareComponent } from './profile/application/offer-square/offer-square.component';
import { OfferCompanyComponent, DeleteDialogContentComponent } from './profile/application/offer-company/offer-company.component';
import { AddOfferComponent, QuitEditionDialogContentComponent } from './profile/application/offer-company/add-offer/add-offer.component';
import { NotificationsService } from './profile/notification/notifications.service';

import { EntreprisesComponent } from './entreprises/entreprises.component';
import { DetailCompanyComponent } from './entreprises/detail-company/detail-company.component';
import { AvisCompanyComponent } from './entreprises/avis-company/avis-company.component';
import { AddCompanyComponent } from './entreprises/add-company/add-company.component';
import { ListCompanyComponent } from './entreprises/list-company/list-company.component';
import { AvisOverviewComponent } from './src/app/entreprises/avis-company/avis-overview/avis-overview.component';

import { GlobalService } from './services/global.service';
import { CompanyService } from './services/company.service';

import { AppRoutingModule } from './app-routing.module';
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
  providers: [GlobalService, OfferViewService, CompanyService, UserService, NotificationsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
