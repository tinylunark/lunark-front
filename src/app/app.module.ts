import {importProvidersFrom, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { LandingModule } from './landing/landing.module';
import { ProfileModule } from './profile/profile.module';
import { PropertiesModule } from "./properties/properties.module";
import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PageNotFoundInterceptor} from "./http-interceptors/page-not-found.interceptor";

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
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PageNotFoundInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
