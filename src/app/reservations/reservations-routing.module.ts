import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HostIncomingReservationsComponent } from './host-incoming-reservations/host-incoming-reservations.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { authGuard } from '../account/guard/auth.guard';

const routes: Routes = [
  { path: 'incoming-reservations', component: HostIncomingReservationsComponent, canActivate: [authGuard], data: { role: ['HOST'] } },
  { path: 'accepted-reservations', component: ReservationListComponent, canActivate: [authGuard], data: { role: ['GUEST'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsRoutingModule { }
