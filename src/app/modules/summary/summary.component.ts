import { Component, OnInit } from '@angular/core';
import {  AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    this.form = this.formBuilder.group({});
  }

  onSubmit()
  {
    this.submitted = true;
    if (this.form.invalid) {
      return false;;
    }
   
    // this.message= JSON.stringify(this.paymentData);
    // sessionStorage.setItem("payment", this.message)
    // this.data.changeMessage( JSON.stringify(this.paymentData));
    //  this.router.navigate(['confirmation']);
     return true;

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


}
