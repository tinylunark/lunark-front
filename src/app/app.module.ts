import { Host, importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { LandingModule } from './landing/landing.module';
import { ProfileModule } from './profile/profile.module';
import { PropertiesModule } from "./properties/properties.module";
import { ReviewsModule } from './reviews/reviews.module';
import { ReservationsModule } from "./reservations/reservations.module";
import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PageNotFoundInterceptor} from "./http-interceptors/page-not-found.interceptor";
import {DateInterceptor} from "./http-interceptors/date.interceptor";
import { JWTInterceptor } from './http-interceptors/jwt.interceptor';
import { SharedModule } from './shared/shared.module';
import { UnauthorizedInterceptor } from './http-interceptors/unauthorized.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HostModule } from './host/host.module';
import { NotificationsModule } from './notifications/notifications.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LandingModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    ProfileModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    PropertiesModule,
    ReviewsModule,
    ReservationsModule,
    HostModule,
    NotificationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    SharedModule,
    NgbModule,
    NgChartsModule,
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PageNotFoundInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
