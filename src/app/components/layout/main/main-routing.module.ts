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
        path: 'roles',
        loadChildren: () => import('../../pages/userRoles/user-role.module').then(m => m.UserRoleModule)
      },

      {
        path: 'kyc-documents',
        loadChildren: () => import('../../pages/kyc-documents/kyc-documents/kyc-documents.module').then(m => m.KycDocumentsModule)
      },

      {
        path: 'all-merchants',
        loadChildren: () => import('../../pages/merchants/merchants/merchants.module').then(m => m.MerchantsModule)
      },
   

      {
        path: 'virtual-accounts',
        loadChildren: () => import('../../pages/virtual-accounts/virtual-accounts/virtual-accounts.module').then(m => m.VirtualAccountsModule)
      },

      {
        path: 'provider-management',
        loadChildren: () => import('../../pages/provider/provider-management/provider-management.module').then(m => m.ProviderManagementModule)
      },

      {
        path: 'collections',
        loadChildren: () => import('../../pages/collection/collection/collection.module').then(m => m.CollectionModule)
      },

      {
        path: 'settlement',
        loadChildren: () => import('../../pages/settlement/settlement/settlement.module').then(m => m.SettlementModule)
      },

      {
        path: 'transactions',
        loadChildren: () => import('../../pages/transactions/transactions/transactions.module').then(m => m.TransactionsModule)
      },

      {
        path: 'lien-management',
        loadChildren: () => import('../../pages/lien/lien/lien.module').then(m => m.LienModule)
      },

      {
        path: 'payout',
        loadChildren: () => import('../../pages/payout/payout/payout.module').then(m => m.PayoutModule)
      },

   
      {
        path: 'wallets',
        loadChildren: () => import('../../pages/wallets/wallet/wallet.module').then(m => m.WalletModule)
      },

      {
        path: 'internal-wallets',
        loadChildren: () => import('../../pages/internal-wallets/internal-wallets/internal-wallets.module').then(m => m.InternalWalletsModule)
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
