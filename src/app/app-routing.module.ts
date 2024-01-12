import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'session-expired', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
  { path: 'home', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: 'properties', loadChildren: () => import('./properties/properties.module').then(m => m.PropertiesModule) },
  { path: 'search', loadChildren: () => import('./properties/properties.module').then(m => m.PropertiesModule) },
  { path: 'approve-changes', loadChildren: () => import('./properties/properties.module').then(m => m.PropertiesModule) },
  { path: 'unapproved-reviews', loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsModule) },
  { path: 'comments-and-grades', loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsModule) },
  { path: 'my-properties', loadChildren: () => import('./properties/properties.module').then(m => m.PropertiesModule) },
  { path: 'incoming-reservations', loadChildren: () => import('./reservations/reservations.module').then(m => m.ReservationsModule) },
  { path: 'accepted-reservations', loadChildren: () => import('./reservations/reservations.module').then(m => m.ReservationsModule) },
  { path: 'verify/:id', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'host/:id', loadChildren: () => import('./host/host.module').then(m => m.HostModule) },
  { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
  { path: 'accounts', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: '**', redirectTo: '404' },
  { path: '404', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
