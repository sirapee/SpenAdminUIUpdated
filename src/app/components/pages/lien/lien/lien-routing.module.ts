import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LienComponent } from './lien.component';

const routes: Routes = [
  {
    path: '',
    component: LienComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LienRoutingModule { }
