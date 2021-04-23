import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, EmailValidator, RequiredValidator, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ExpenseService } from 'src/app/expense.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent implements OnInit {

  verifyotpForm: FormGroup;

  constructor(private expenseservice: ExpenseService, private snackBar: MatSnackBar,private router: Router,private formbuilder: FormBuilder) { }

  ngOnInit(){
    this.verifyotpForm = this.formbuilder.group({
      otp: [null,Validators.required]
    })
  }

  verify(value: any){
    console.log(value.otp,'this is otp');
    this.expenseservice.getotp().subscribe(
      d => {
        console.log(d,'d');
        if(value.otp  == d){
          this.router.navigate(['/resetpassword'])

        }else{
          console.log("incorrect otp")
        }
      }
    );
  }

}
