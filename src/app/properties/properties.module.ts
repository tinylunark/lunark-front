import {NgModule} from '@angular/core';
import {PropertiesComponent} from "./properties/properties.component";
import {PropertiesRoutingModule} from "./properties-routing.module";
import {SharedModule} from "../shared/shared.module";
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "../../infrastructure/material/material.module";
import { CoreModule } from '../core/core.module';
import { SearchComponent } from './search/search.component';
import {AsyncPipe} from "@angular/common";


@NgModule({
  declarations: [
    PropertiesComponent,
    PropertyDetailComponent,
    SearchComponent
  ],
  exports: [
    SearchComponent
  ],
  imports: [
    SharedModule,
    PropertiesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    CoreModule,
    AsyncPipe
  ]
})
export class PropertiesModule {
}
