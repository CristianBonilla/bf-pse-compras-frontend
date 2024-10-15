import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContentModule } from "@module/content/content.module";
import { ConfirmAccountComponent } from '@module/transaction/confirm-account/confirm-account.component';
import { InvalidComponent } from '@module/transaction/invalid/invalid.component';
import { TransactionRoutingModule } from '@module/transaction/transaction-routing.module';
import { TransactionComponent } from '@module/transaction/transaction.component';
import { VoucherComponent } from '@module/transaction/voucher/voucher.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    TransactionComponent,
    InvalidComponent,
    VoucherComponent,
    ConfirmAccountComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule,
    ContentModule
  ],
  providers: [CurrencyPipe]
})
export class TransactionModule { }
