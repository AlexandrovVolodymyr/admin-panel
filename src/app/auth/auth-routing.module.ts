import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './container/login-page/login-page.component';
import { OnlyUnauthGuard } from './guard/only-unauth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    canActivate: [OnlyUnauthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
