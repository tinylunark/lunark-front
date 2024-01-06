import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { authGuard } from './guard/auth.guard';
import { VerificationComponent } from "./verification/verification.component";
import { AccountBlockComponent } from './account-block/account-block.component';

const routes: Routes = [
  { path: 'verify/:id', component: VerificationComponent },
  { path: 'accounts', component: AccountBlockComponent, canActivate: [authGuard], data: {role: ['ADMIN'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
