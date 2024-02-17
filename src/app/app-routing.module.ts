import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent as main } from './main/base/base.component';
import { BaseComponent as auth } from './Auth/base/base.component';
import { authGuard } from './Guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: main, canActivate: [authGuard]},
  { path: 'login', component: auth}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
