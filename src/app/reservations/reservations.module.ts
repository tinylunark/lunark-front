import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from "@angular/common";
import { ReviewsModule } from '../reviews/reviews.module';
import { HostIncomingReservationsComponent } from './host-incoming-reservations/host-incoming-reservations.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from "../shared/shared.module";
import { ReservationsRoutingModule } from "./reservations-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../../infrastructure/material/material.module";
import {ReservationSearchComponent} from "./reservation-list/reservation-search/reservation-search.component";

@NgModule({
  declarations: [
    HostIncomingReservationsComponent,
    ReservationListComponent,
    ReservationSearchComponent,
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
    ReservationListComponent,
    ReservationSearchComponent,
  ]
})
export class ReservationsModule { }
