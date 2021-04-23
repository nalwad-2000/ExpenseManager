import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from 'src/app/expense.service';
import {SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { error } from 'protractor';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.css']
})
export class AddexpenseComponent implements OnInit {

  bill: string;
  addexpform : FormGroup;

  constructor(private snackBar: MatSnackBar,@Inject(SESSION_STORAGE) private storage: WebStorageService,private expenseservice: ExpenseService,private formbuilder: FormBuilder) { }

  ngOnInit(){
    let userid = this.storage.get("userid");
    let username = this.storage.get("username");

    this.addexpform = this.formbuilder.group({
      expdate: [null,Validators.required],
      expcat: [null,Validators.required],
      expamt: [null,Validators.required],
      expsrc: [''],
      bill: [''],
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
    this.addexpform.reset();
  }

  onchange($event: Event){
    const file = ($event.target as HTMLInputElement).files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File){
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file,subscriber);
    });
    observable.subscribe((d) => {
      //console.log(d);
      //this.bill = d;
      this.addexpform.get('bill').setValue(d);
    });
  }

  readFile(file: File, subscriber: Subscriber<any>){
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    }
  }

  addexp(value: any){
    console.log(value);

    this.expenseservice.addexp(value).subscribe(
      data => console.log(data),
      error => console.log(error)
    )

    this.expenseservice.expenses.push(value);
  }

}
