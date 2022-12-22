import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EnvironmentLoaderService } from 'src/app/core/config/environment-loader.service';
import { DataService } from 'src/app/core/services/DataService';
import { StepService } from 'src/app/core/services/StepService';
import { TransactionService } from 'src/app/core/services/TransactionService';
import { PaymentData } from 'src/app/shared/paymentData';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @ViewChild("contentError", { static: true }) contentError!: ElementRef;
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
  private urlApi = ''
  constructor(private http: HttpClient, private router: Router, private data: DataService, private readonly envService: EnvironmentLoaderService, private stepService: StepService, private transactionService: TransactionService, private modalService: NgbModal) { }

  ngOnInit() {
    this.stepService.changeStep(4);
    this.data.currentMessage.subscribe(message => this.message = message);
    this.paymentData = this.data.getPaymentDataStep2(this.message);
    this.loadTransaction();
  }

  loadTransaction() {
    this.transactionService.transaction(this.paymentData).subscribe({
      next: (response: any) => {
        //Si el estado ya es confirmado rediriga a la pantalla resumen.. Transaccion no valida  Boton volver 

        // summaryTransaction='';
        switch (response.getTransactions.transactionStateIdBF) {
          case 3:
            this.state = "Aprobada";
            if (response.getTransactions.transactionStateIdACH == 3) {
              this.state = "Realizamos el pago de tu cuenta y está pendiente la aprobación de PSE, en caso de ser rechazado se reversara a tu cuenta";
            }
            break;
          case 7:

            this.state = "Rechazada";
            switch (response.getTransactions.approvalNumberBF) {
              case "00001":
                this.state = 'Rechazada Usuario Abandono Transacción';
                break;
              case "00008":
                this.state = 'Rechazada Usuario Excede el Limite Transaccional Autorizado por el Banco';
                break;
              case "00010":
                this.state = 'Rechazada Fallas Técnicas';
                break;
              case "00011":
                this.state = 'Rechazada Fondos Insuficientes';
                break;
              case "00015":
                this.state = 'Rechazada Transacción no Concluida en el Banco';
                break;
              case "00016":
                this.state = 'Rechazada Datos de Acceso Inválidos';
                break;
            }
            break;
        }
        this.approvalNumberACH = response.getTransactions.approvalNumberACH;
        this.ticketId = response.getTransactions.ticketId;
        this.nameEntity = response.getTransactions.nameEntity;
        this.paymetDescription = response.getTransactions.paymetDescription;
        this.referenceNumber1 = response.getTransactions.referenceNumber1;
        this.referenceNumber2 = response.getTransactions.referenceNumber2;
        this.referenceNumber3 = response.getTransactions.referenceNumber3;
        this.operationValue = response.getTransactions.operationValue;
        this.ivaValue = response.getTransactions.ivaValue;
        this.approvalNumberBF = response.getTransactions.approvalNumberBF=='None'?'':response.getTransactions.approvalNumberBF;
        this.transactionDate = response.getTransactions.transactionDate;
      },
      error: (e) => {
        console.error(e);
        switch (e.status) {
          case 500:
          case 204:
            this.titleMessageModal = this.envService.getResourceConfig().stp2_ModalErrorTitle;
            this.messageModal = this.envService.getResourceConfig().stp2_Transaction_500;
            this.modalReference = this.modalService.open(this.contentError, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
            break;
          case 401:
            this.redirectLogin();
            break;
        }
      }
    });
  }

  redirectLogin() {
    this.router.navigate(['login'], { queryParams: { itx: this.paymentData.itx } });
  }

  onModalClose() {
    this.modalReference.close();
    this.loadTransaction();
  }

  onPrintPage()
  {
    window.print();
  }
}
