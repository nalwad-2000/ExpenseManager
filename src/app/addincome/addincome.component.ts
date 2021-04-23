import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/expense.service';
import {SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-addincome',
  templateUrl: './addincome.component.html',
  styleUrls: ['./addincome.component.css']
})
export class AddincomeComponent implements OnInit {

  addincform : FormGroup;

  constructor(private snackBar: MatSnackBar,@Inject(SESSION_STORAGE) private storage: WebStorageService,private expenseservice: ExpenseService,private formbuilder: FormBuilder) { }

  ngOnInit(){
    let userid = this.storage.get("userid");
    let username = this.storage.get("username");

    this.addincform = this.formbuilder.group({
      incdate: [null,Validators.required],
      inccat: [null,Validators.required],
      incamt: [null,Validators.required],
      incsrc: [''],
      userid: [userid],
      username: [username]
    })
  }

  opensnack(message,action){
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  cancel(){
    this.addincform.reset();
  }

  addinc(value: any){
    console.log(value);

    this.expenseservice.addinc(value).subscribe(
      data => console.log(data),
      error => console.log(error)
    )

    this.expenseservice.incomes.push(value);
  }

}
