import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EnvironmentLoaderService } from "src/app/core/config/environment-loader.service";
import { DataService } from "src/app/core/services/data-service.service";
import { LoginService } from "src/app/core/services/LoginService";
import { SessionService } from "src/app/core/services/SessionService";

import { StepService } from "src/app/core/services/StepService";
import { TransactionService } from "src/app/core/services/TransactionService";
import { PaymentData } from "src/app/shared/entities/PaymentData";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @ViewChild("contentError4", { static: true }) contentError!: ElementRef;
  form!: FormGroup;
  submitted = false;
  closeResult = '';
  name = 'World';
  summaryTransaction = '';
  state = '';
  approvalNumberACH = '';
  ticketId = '';
  nameEntity = '';
  paymetDescription = '';
  referenceNumber1 = '';
  referenceNumber2 = '';
  referenceNumber3 = '';
  operationValue = '';
  ivaValue = 0;
  approvalNumberBF = '';
  transactionDate = '';
  message = '';
  paymentData!: PaymentData;
  titleMessageModal = '';
  messageModal = '';
  modalReference!: NgbModalRef;
  urlEntity='';
  private urlApi = ''
  constructor(private http: HttpClient, private router: Router, private data: DataService, private readonly envService: EnvironmentLoaderService, private stepService: StepService, private transactionService: TransactionService, private modalService: NgbModal,private loginService:LoginService,private sessionService:SessionService) { }

  ngOnInit() {
    this.stepService.changeStep(4);
    this.data.currentMessage.subscribe({next:(message:any)=>{this.message=message}});
    this.paymentData = this.data.getPaymentDataStep2(this.message);
    this.loadTransaction();
  }

  loadTransaction() {
    this.transactionService.transaction(this.paymentData,"S").subscribe({
      next: (response: any) => {
        //Si el estado ya es confirmado rediriga a la pantalla resumen.. Transaccion no valida  Boton volver 

        // summaryTransaction='';
        switch (response.getTransactions.transactionStateIdBF) {          
          case 7: // Rechazado:TRX05

            this.state = this.envService.getResourceConfig().summary_7_TRX05_Rejected;
            switch (response.getTransactions.transactionStateIdACH) {
              case "1":
                this.state =this.envService.getResourceConfig().summary_7_TRX05_00001_Abandon;
                break;
              case "8":
                this.state = this.envService.getResourceConfig().summary_7_TRX05_00008_Limit;
                break;
              case "10":
                this.state = this.envService.getResourceConfig().summary_7_TRX05_00010_Fail;
                break;
              case "11":
                this.state = this.envService.getResourceConfig().summary_7_TRX05_00011_Founds;
                break;
              case "15":
                this.state = this.envService.getResourceConfig().summary_7_TRX05_00015_Incomplete;
                //Esperar dos minutos para visualizar el mensaje, no se rediriga a login por tiempo session del front
                this.sessionService.changeTimeLife(2);
                this.sessionService.changeDateStart(this.addMinutes(new Date(), response.timeLife))
                break;
              case "16":
                this.state = this.envService.getResourceConfig().summary_7_TRX05_00016_NotAccess;
                break;
            }
            break;
            case 8:  // Aplicado:TRX06
            this.state = this.envService.getResourceConfig().summary_8_TRX06_Approved;
              // if (response.getTransactions.transactionStateIdACH == 3) {
                this.state = this.envService.getResourceConfig().summary_8_TRX06_ApprovedPending;
              // }
            break;
            case 9:  // Error: TRX07
              this.state =  this.envService.getResourceConfig().summary_9_TRX07_Error;
              break;
        }
        this.approvalNumberACH = response.getTransactions.approvalNumberACH=='None'?'':response.getTransactions.approvalNumberACH;;
        this.ticketId = response.getTransactions.ticketId;
        this.nameEntity = response.getTransactions.nameEntity;
        this.paymetDescription = response.getTransactions.paymetDescription;
        this.referenceNumber1 = response.getTransactions.referenceNumber1;
        this.referenceNumber2 = response.getTransactions.referenceNumber2;
        this.referenceNumber3 = response.getTransactions.referenceNumber3;
        this.operationValue = response.getTransactions.operationValue;
        this.ivaValue = response.getTransactions.ivaValue;
        this.approvalNumberBF = response.getTransactions.approvalNumberBF;
        this.transactionDate = response.getTransactions.responseDateBF.replace('T',' ');
        this.urlEntity=response.getTransactions.urlEntity;
      },
      error: (e:any) => {
        console.error(e);
        switch (e.status) {
          case 500:
          case 204:
            this.titleMessageModal = this.envService.getResourceConfig().stp2_ModalErrorTitle;
            this.messageModal = this.envService.getResourceConfig().stp2_Transaction_500;
            this.modalReference = this.modalService.open(this.contentError, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
            break;
          case 401:
            switch (e.error)
              {
                case "TranExpire":break;                
                default:  
                  this.redirectLogin(this.envService.getResourceConfig().auth_TransactionInvalid);break;
              } 
            break;
        }
      }
    });
  }

  redirectLogin(msg:string)
  {
    this.loginService.changeMessage(msg);
    this.router.navigate(['login'],{queryParams:{itx:this.paymentData.itx}});
  }

  onModalClose() {
    this.modalReference.close();
    this.loadTransaction();
  }

  onPrintPage()
  {
    window.print();
  }
  onSubmit()
  {
    window.location.href =this.urlEntity;
  }
  addMinutes(date: Date, minutes:number) {
    date.setMinutes(date.getMinutes() + minutes);  
    return date;
  }

}
