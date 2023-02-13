import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { EnvironmentLoaderService } from "src/app/core/config/environment-loader.service";
import { cancelTransactionService } from "src/app/core/services/CancelTranService";
import { PaymentData } from "../entities/PaymentData";


@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent {

  constructor(private cancelTransactionService :cancelTransactionService,private router: Router,private readonly envService: EnvironmentLoaderService){}

  @Input() paymentData!: PaymentData;
  @Output() messageChange = new EventEmitter<string>();
  messageError='';
  onClickCancel()
  {
    try
    {
      this.messageChange.emit('');   
      this.cancelTransactionService.cancelTransaction(this.paymentData.itx).subscribe({
          next: (resp:any) =>  {
            
            this.router.navigate(['summary']);
          },
          error: (e:any) => {
            console.error(e);
            switch (e.status)
              {
                case 500:   
                  this.messageChange.emit(this.envService.getResourceConfig().cancel_500);                
                break;             
              }
          }
      });
    }catch(error)     
    {
      console.log(error);
    }
  }
}
