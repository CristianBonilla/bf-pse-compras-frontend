import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EnvironmentLoaderService } from "src/app/core/config/environment-loader.service";
import { ConfirmTransactionService } from "src/app/core/services/ConfirmTransactionService";
import { DataService } from "src/app/core/services/data-service.service";

import { GenerateOtpService } from "src/app/core/services/GenerateOtpService";
import { LoginService } from "src/app/core/services/LoginService";
import { StepService } from "src/app/core/services/StepService";
import { TransactionService } from "src/app/core/services/TransactionService";
import { ValidateOtpService } from "src/app/core/services/ValidateOtpService";
import { PaymentData } from "src/app/shared/entities/PaymentData";


@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  @ViewChild("contentError2", { static: true }) contentError!: ElementRef;
  paymentData!: PaymentData;
  submitted = false;
  form!: FormGroup;
  message = "";
  cellPhone = "";
  otp_type = "";
  responseCode = "";
  paymentRecurring = false;
  formModal: any;
  titleMessageModal = '';
  messageModal = '';
  modalReference!: NgbModalRef;
  loadFailed = 0;
  messageError = '';
  keyInvalid='';
  showWhatsappLink=false;
  private urlApi = "";
  constructor(private http: HttpClient, private readonly envService: EnvironmentLoaderService, private router: Router, private data: DataService, private formBuilder: FormBuilder, private modalService: NgbModal, private stepService: StepService, private generateOtpService: GenerateOtpService, private transactionService: TransactionService, private validateOtpService: ValidateOtpService, private confirmTransactionService: ConfirmTransactionService, private loginService:LoginService) { }
  ngOnInit() {
    try
    {
      this.stepService.changeStep(2);
      this.form = this.formBuilder.group(
        {
          otp: ['', Validators.required]
        });
      this.data.currentMessage.subscribe({next:(message:any)=>{this.message=message}});
      this.paymentData = this.data.getPaymentDataStep2(this.message);
      this.loadTransaction();
      this.generateOtp();
    }catch(error)
    {
      console.log(error);
    }

  }

  loadTransaction() {
    this.transactionService.transaction(this.paymentData,'2').subscribe({
      next: (response: any) => {
        //Si el estado ya es confirmado rediriga a la pantalla resumen.. Transaccion no valida  Boton volver 

        this.paymentData.paymetDescription = response.getTransactions.paymetDescription;
        this.paymentData.transactionCost = response.getTransactions.transactionCost;
        this.paymentData.operationValue = response.getTransactions.operationValue;
        this.paymentData.nameEntity = response.getTransactions.nameEntity;
      },
      error: (e:any) => {
        console.error(e);
        switch (e.status) {
          case 500:
          case 204:
            this.loadFailed = 0;
            this.titleMessageModal = this.envService.getResourceConfig().stp2_ModalErrorTitle;
            this.messageModal = this.envService.getResourceConfig().stp2_Transaction_500;
            this.modalReference = this.modalService.open(this.contentError, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
            break;
            case 401:
              switch (e.error)
              {
                case "TranExpire":
                  this.redirectSummary();break;
                default:  
                  this.redirectLogin(this.envService.getResourceConfig().auth_TransactionInvalid);break;
              }
            break;
        }
      }
    });
  }

  generateOtp() {
    this.generateOtpService.generateOtp(this.paymentData.token, this.paymentData.available_balance).subscribe({
      next: (response: any) => {
        this.cellPhone = response.phone;
        this.responseCode = response.response;
        this.otp_type = response.otp_type;
        if (this.otp_type == 'OTP') {
          this.form = this.formBuilder.group(
            {
              otp: ['', Validators.required]
            });
          this.form.controls["otp"].setValidators([Validators.required, Validators.minLength(6)]);
        }
        else if (this.otp_type == 'TIMESOFTTOKEN') {
          this.form = this.formBuilder.group(
            {
              sofToken: ['', Validators.required]
            });
          this.form.controls["sofToken"].setValidators([Validators.required, Validators.minLength(6)]);
        }
        else {
          this.form = this.formBuilder.group({});
        }
      },
      error: (e: any) => {
        this.showWhatsappLink=false;
        console.error(e);
        switch (e.status) {
          case 401:
            switch (e.error)
            {
              case "TranExpire":
              case "NoFunds":
                this.redirectSummary();break;
              case "No Content":
                this.redirectLogin(this.envService.getResourceConfig().auth_TransactionInvalid);break;
              
              default:  
                this.loadFailed = 1;
                this.titleMessageModal = this.envService.getResourceConfig().stp2_ModalErrorTitle;
                this.messageModal = this.envService.getResourceConfig().stp2_GenerateOtp_401;
                if (e.error && e.error.response && e.error.response=='LOCK')
                {
                  this.messageModal = this.envService.getResourceConfig().stp2_GenerateOtp_401Lock;
                  this.showWhatsappLink=true;
                }              
                this.modalReference = this.modalService.open(this.contentError, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
            }           
            break;
          case 500:
            this.loadFailed = 1;
            this.titleMessageModal = this.envService.getResourceConfig().stp2_ModalErrorTitle;
            this.messageModal = this.envService.getResourceConfig().stp2_GenerateOtp_500;
            this.modalReference = this.modalService.open(this.contentError, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
            break;
        }
      }
    });
  }

  redirectSummary()
  {
    this.router.navigate(['summary']);
  }

  redirectLogin(msg:string)
  {
    this.loginService.changeMessage(msg);
    this.router.navigate(['login'],{queryParams:{itx:this.paymentData.itx}});
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    try
    {
      this.keyInvalid='';
      this.submitted = true;
      if (this.form.invalid) {
        return false;
      }
      this.validateOtpAndConfirm();
      return true;
    }catch(error)
    {
      console.log(error);
      return false;
    }
  }

  validateOtpAndConfirm() {
    this.validateOtpService.validateOtp(this.paymentData, this.otp_type, this.otp_type == "OTP" ? this.form.controls["otp"].value : this.form.controls["sofToken"].value).subscribe({
      next: (response: any) => {
        if (response.status) {
          if (response.status) {
            this.confirmTransaction();
          }
        }
      },
      error: (e: any) => {
        console.error(e);
        switch (e.status)
          {
            case 401:
              
              switch (e.error)
              {
                case "TranExpire":
                  this.redirectSummary();break;
                case "No Content":
                  this.redirectLogin(this.envService.getResourceConfig().auth_TransactionInvalid);break;
                default:
                  this.keyInvalid =this.envService.getResourceConfig().stp2_ValidatekeyInvalid;
                  this.messageError=this.envService.getResourceConfig().stp2_ValidateOtp_Invalid;
                  this.submitted = false;
                  if (this.otp_type == "OTP")
                  {
                    this.form.controls["otp"].reset();
                  }
                  else
                  {
                    this.form.controls["sofToken"].reset();
                  }
                break;
            case 500:  
              this.loadFailed=2; 
              this.titleMessageModal=this.envService.getResourceConfig().stp2_ModalErrorTitle;
              this.messageModal=this.envService.getResourceConfig().stp2_ValidateOtp_500;
              this.modalReference =this.modalService.open(this.contentError, { ariaLabelledBy: 'modal-basic-title',backdrop:'static', keyboard : false });         
            break;             
          }
        }
      }
    });
  }


  confirmTransaction() {
    this.confirmTransactionService.confirmTransaction(this.paymentData).subscribe({
      next: (response: any) => {
        switch (response.state)
        {
          case "OK":        
            this.paymentData.dateTransacion = new Date();
            this.message = JSON.stringify(this.paymentData);
            this.data.changeMessage(JSON.stringify(this.paymentData));
            this.router.navigate(['voucher']);
            break;
          case "FAILED":
            this.redirectSummary();break;
            break;
        }
      },
      error: (e: any) => {
        console.error(e);
        switch (e.status)
          {
            case 401:
              switch (e.error)
              {
                case "TranExpire":
                  this.redirectSummary();break;
                default:  
                  this.redirectLogin(this.envService.getResourceConfig().auth_TransactionInvalid);break;
              }
          }
      }
    }
    );

  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  changePaymentRecurring(e: any, content: any) {
    if (e.currentTarget.checked) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
  }

  onModalClose() {
    try
    {
      this.modalReference.close();
      switch(this.loadFailed)
      {
        case 0:this.loadTransaction();break;
        case 1:this.generateOtp();break;
        case 2:this.validateOtpAndConfirm();break;
      }
    }catch(error)
    {
      console.log(error);
    }
  }

  onModalCloseTop() {
    try
    {
      this.modalReference.close();
      switch(this.loadFailed)
      {
        case 0:this.onBack();break;
        case 1:this.onBack();break;      
      }
    }catch(error)
    {
      console.log(error);
    }
  }

  onMessageChange(message: string) {
    this.messageError = message;
  }

  onBack()
  {
    try
    {
      this.router.navigate(['definition']);
    }catch(error)
    {
      console.log(error);
    }
  }
}
