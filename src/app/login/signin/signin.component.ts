import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, EmailValidator, RequiredValidator, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/expense.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinform : FormGroup;

  constructor(private snackBar: MatSnackBar,private expenseservice: ExpenseService,private router: Router,private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.signinform = this.formbuilder.group({
      username: [null,Validators.required],
      password: [null,Validators.required],
      email: [null,Validators.required],
      phone: [null,Validators.required]
    })
  }

  opensnack(message,action){
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  signin(value: any){
    console.log(value);

    this.expenseservice.signin(value).subscribe(
      data => console.log(data),
      error => console.log(error)
    );

    this.router.navigate(['/']);
  }

}
