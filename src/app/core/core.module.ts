import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { ContainerComponent } from './container/container.component';
import { HelperMenuComponent } from './helper-menu/helper-menu.component';
import { AccountModule } from '../account/account.module';
import { MaterialModule } from '../../infrastructure/material/material.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {CoreRoutingModule} from "./core-routing.module";
import { SessionExpiredComponent } from './session-expired/session-expired.component';

@NgModule({
  declarations: [
    HelperMenuComponent,
    NavBarComponent,
    HeaderComponent,
    ContainerComponent,
    PageNotFoundComponent,
    SessionExpiredComponent
  ],
  imports: [
    CommonModule,
    AccountModule,
    MaterialModule,
    RouterLink,
    RouterLinkActive,
    CoreRoutingModule,
  ],
  exports: [
    HelperMenuComponent,
    NavBarComponent,
    HeaderComponent,
    ContainerComponent,
    PageNotFoundComponent,
  ]
})
export class CoreModule { }
