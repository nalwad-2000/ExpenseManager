import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, EmailValidator, RequiredValidator, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ExpenseService } from 'src/app/expense.service';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-forpass',
  templateUrl: './forpass.component.html',
  styleUrls: ['./forpass.component.css']
})
export class ForpassComponent implements OnInit {

  forpassForm : FormGroup;
  
  constructor(private expenseservice: ExpenseService,private snackBar: MatSnackBar,private router: Router,private formbuilder: FormBuilder) { }

  ngOnInit(){
    this.forpassForm = this.formbuilder.group({
      regemail: [null,Validators.required],
    })
  }

  opensnack(message,action){
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  sendotp(value: any){
    console.log(value)
    this.expenseservice.getusers().subscribe(
     d => {
       d.map(e => {
         if(e.email === value.regemail){ 
           console.log(e.email,'this is the email')
           this.router.navigate(['/verifyotp'])
           this.expenseservice.otpmail = value.regemail;
           this.expenseservice.sendotp(value).subscribe(
             data => console.log(data),
             error => console.log(error)
           )
         }else{
           console.log("This email doesnot exist")
         }
       })
     }
    )

  }

}
