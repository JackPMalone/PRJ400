import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { BaseComponent as MainBase } from './main/base/base.component';
import { BaseComponent as AuthBase } from './auth/base/base.component';
import { BaseComponent as DeviceBase } from './newDevice/base/base.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainBase },
  { path: 'login', component: AuthBase },
  { path: 'new', component: DeviceBase}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }