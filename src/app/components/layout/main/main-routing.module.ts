import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
// import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/authentication/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
     
      {
        path: 'dashboard',
        loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        
      },

      {
        path: 'user-management',
        loadChildren: () => import('../../pages/user-management/users.module').then(m => m.UsersModule)
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

    ],
      
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
