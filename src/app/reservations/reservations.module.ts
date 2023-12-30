import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from "@angular/common";
import { ReviewsModule } from '../reviews/reviews.module';
import { HostIncomingReservationsComponent } from './host-incoming-reservations/host-incoming-reservations.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from "../shared/shared.module";
import { ReservationsRoutingModule } from "./reservations-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../../infrastructure/material/material.module";

@NgModule({
  declarations: [
    HostIncomingReservationsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReservationsRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    CoreModule,
    AsyncPipe,
    ReviewsModule
  ],
  exports: [
    HostIncomingReservationsComponent,
  ]
})
export class ReservationsModule { }
