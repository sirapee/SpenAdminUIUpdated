import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirtualAccountsComponent } from './virtual-accounts.component';

const routes: Routes = [
  {
    path: '',
    component: VirtualAccountsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualAccountsRoutingModule { }
