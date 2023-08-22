import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/services/auth.guard';
import { PreventLoginGuard } from './authentication/services/login-guard.guard';
import { AuthenticationModule } from './authentication/authentication.module';
import { MainRoutingModule } from './components/layout/main/main-routing.module';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  { path: 'auth', 
  loadChildren: () => AuthenticationModule ,
  canActivate: [PreventLoginGuard]
},

  {
    path: 'main',
    loadChildren: () => import('./components/layout/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
