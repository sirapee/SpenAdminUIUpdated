import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KycDocumentsComponent } from './kyc-documents.component';

const routes: Routes = [
  {
    path: '',
    component:KycDocumentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KycDocumentsRoutingModule { }
