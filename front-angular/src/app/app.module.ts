import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { Ng2ImgMaxModule } from 'ng2-img-max';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { HomeComponent } from './components/home/home.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

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

import { ProfileComponent } from './components/profile/profile.component';
import { ProfileDetailComponent } from './components/profile/profile-detail/profile-detail.component';
import { OfferSquareComponent } from './components/profile/application/offer-square/offer-square.component';
import { OfferCompanyComponent, DeleteDialogContentComponent } from './components/profile/application/offer-company/offer-company.component';
import { AddOfferComponent, QuitEditionDialogContentComponent } from './components/profile/application/offer-company/add-offer/add-offer.component';
import { AddPdfComponent, PdfPreviewComponent } from './components/entreprises/add-pdf/add-pdf.component';

import { EntreprisesComponent } from './components/entreprises/entreprises.component';
import { DetailCompanyComponent } from './components/entreprises/detail-company/detail-company.component';
import { AvisCompanyComponent, DeleteAvisComponent } from './components/entreprises/avis-company/avis-company.component';
import { AddCompanyComponent } from './components/entreprises/add-company/add-company.component';
import { ListCompanyComponent, DeleteCompanyComponent } from './components/entreprises/list-company/list-company.component';
import { AvisOverviewComponent } from './components/entreprises/avis-company/avis-overview/avis-overview.component';
import { AddLogoComponent } from './components/entreprises/add-logo/add-logo.component';

import { FooterComponent } from './components/footer/footer.component';

import { CompanyService, UserService, SelectService, OfferService, DocumentService, LoggerService } from './services';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './modules/material.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    HomeComponent,
    OffersComponent,
    LoggingComponent,
    ProfileComponent,
    FilterComponent,
    OfferPreviewComponent,
    OfferDetailComponent,
    RegisterFormComponent,
    ProfileDetailComponent,
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
    DeleteCompanyComponent,
    DeleteDialogContentComponent,
    QuitEditionDialogContentComponent,
    AvisOverviewComponent,
    AddLogoComponent,
    AddPdfComponent,
    PdfPreviewComponent,
    DeleteAvisComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    Ng2ImgMaxModule,
    PdfViewerModule
  ],
  entryComponents: [
    DeleteDialogContentComponent,
    QuitEditionDialogContentComponent,
    DeleteCompanyComponent,
    AddCompanyComponent,
    PdfPreviewComponent,
    DeleteAvisComponent
  ],
  exports: [OfferDetailComponent],
  providers: [OfferService, CompanyService, UserService, SelectService, DocumentService, LoggerService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
