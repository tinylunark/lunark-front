import { NgModule } from '@angular/core';
import {PropertiesComponent} from "./properties/properties.component";
import {PropertiesRoutingModule} from "./properties-routing.module";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    PropertiesComponent
  ],
  exports: [
    PropertiesComponent
  ],
  imports: [
    SharedModule,
    PropertiesRoutingModule,
  ]
})
export class PropertiesModule { }
