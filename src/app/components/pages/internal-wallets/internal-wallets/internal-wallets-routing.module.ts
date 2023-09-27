import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalWalletsComponent } from './internal-wallets.component';

const routes: Routes = [
  {
    path: '',
    component: InternalWalletsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalWalletsRoutingModule { }
