import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderManagementComponent } from './provider-management.component';

const routes: Routes = [
  {
    path: '',
    component: ProviderManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderManagementRoutingModule { }
