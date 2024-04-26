import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { BaseComponent as MainBase } from './main/base/base.component';
import { BaseComponent as AuthBase } from './auth/base/base.component';
import { BaseComponent as NewBase } from './new/base/base.component';
import { BaseComponent as DeviceBase } from './device/base/base.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthBase },
  { path: 'home', component: MainBase },
  { path: 'new', component: NewBase},
  { path: 'device', component: DeviceBase}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
