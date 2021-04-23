import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, EmailValidator, RequiredValidator, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ExpenseService } from 'src/app/expense.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.css']
})
export class ResetpassComponent implements OnInit {

  resetForm: FormGroup;

  constructor(private expenseservice: ExpenseService, private snackBar: MatSnackBar,private router: Router,private formbuilder: FormBuilder) { }

  ngOnInit(){
    this.resetForm = this.formbuilder.group({
      newpass: [null,Validators.required],
      conpass: [null,Validators.required],
      email: ['']
    })
  }

  onchange($event: Event){
    this.resetForm.get('email').setValue(this.expenseservice.otpmail);
  }

  reset(value: any){
    console.log(value);
    if(value.newpass === value.conpass){
      this.router.navigate(['/'])
    }else{
      alert("Enter the new Password again")
    }

    this.expenseservice.resetpass(value).subscribe(
      data => console.log(data),
      error => console.log(error)
    )
  }

}
