import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login.component';
import { VerifyEmailComponent } from './verify-email.component';

const routes: Routes = [
  {
    path: '',
    component: VerifyEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyEmailRoutingModule { }
