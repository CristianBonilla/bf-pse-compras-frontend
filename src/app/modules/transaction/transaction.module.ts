import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentModule } from "@module/content/content.module";
import { TransactionRoutingModule } from '@module/transaction/transaction-routing.module';
import { TransactionComponent } from '@module/transaction/transaction.component';
import { VoucherComponent } from './voucher/voucher.component';

@NgModule({
  declarations: [TransactionComponent, VoucherComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    ContentModule
  ]
})
export class TransactionModule { }
