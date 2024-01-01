import { NgModule } from '@angular/core';
import { HostPageComponent } from './host-page/host-page.component';
import { ReviewsModule } from '../reviews/reviews.module';
import { HostRoutingModule } from './host-routing.module';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { CoreModule } from '../core/core.module';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    HostPageComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    MaterialModule,
    ReviewsModule,
    HostRoutingModule
  ],
})
export class HostModule { }
