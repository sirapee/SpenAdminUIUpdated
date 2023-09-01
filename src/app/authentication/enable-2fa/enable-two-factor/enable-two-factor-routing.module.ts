import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnableTwoFactorComponent } from './enable-two-factor.component';


const routes: Routes = [
  {
    path: '',
    component: EnableTwoFactorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnableTwoFactorRoutingModule { }
