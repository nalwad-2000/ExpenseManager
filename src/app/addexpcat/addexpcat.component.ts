import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/expense.service';
import {SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-addexpcat',
  templateUrl: './addexpcat.component.html',
  styleUrls: ['./addexpcat.component.css']
})
export class AddexpcatComponent implements OnInit {

  addexpcatform : FormGroup;

  constructor(private snackBar: MatSnackBar,@Inject(SESSION_STORAGE) private storage: WebStorageService,private expenseservice: ExpenseService,private formbuilder: FormBuilder) { }

  ngOnInit(){
    let userid = this.storage.get("userid");
    let username = this.storage.get("username");

    this.addexpcatform = this.formbuilder.group({
      expcat: [null,Validators.required],
      expdesc: [''],
      userid:[userid],
      username: [username]
    })
  }

  opensnack(message,action){
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  cancel(){
    this.addexpcatform.reset();
  }

  addexpcat(value: any){
    console.log(value);

    this.expenseservice.addexpcat(value).subscribe(
      data => console.log(data),
      error => console.log(error)
    )

    this.expenseservice.expensecategory.push(value);
  }

}
