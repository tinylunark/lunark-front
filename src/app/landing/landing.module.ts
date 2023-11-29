import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { LandingComponent } from './landing/landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import {PropertiesModule} from "../properties/properties.module";

@NgModule({
  declarations: [
    HeroComponent,
    LandingComponent,
  ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        PropertiesModule
    ],
  exports: [
    HeroComponent,
    LandingComponent,
  ]
})
export class LandingModule { }
