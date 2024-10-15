import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmAccountComponent } from '@module/transaction/confirm-account/confirm-account.component';
import { InvalidComponent } from '@module/transaction/invalid/invalid.component';
import { TransactionComponent } from '@module/transaction/transaction.component';
import { VoucherComponent } from '@module/transaction/voucher/voucher.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionComponent
  },
  {
    path: 'invalid',
    component: InvalidComponent
  },
  {
    path: 'confirm-account',
    component: ConfirmAccountComponent
  },
  {
    path: 'voucher',
    component: VoucherComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
