import { Component, OnInit } from '@angular/core';
import { AddexpenseComponent } from '../addexpense/addexpense.component';
import {MatDialog} from '@angular/material/dialog';
import { BillComponent } from './bill/bill.component';
import { ExpenseService } from 'src/app/expense.service';
import {SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';
import { NobillComponent } from './nobill/nobill.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenseArray:any=[];
  autoexpArray: any=[];

  constructor(private dialog: MatDialog,@Inject(SESSION_STORAGE) private storage: WebStorageService,private expenseservice: ExpenseService) { }

  openDialog() {
      this.dialog.open(AddexpenseComponent,{height:'600px',width:'400px'});
  }

  openBill(bill) {
    if(bill==""){
      this.dialog.open(NobillComponent);
    }else{
      this.dialog.open(BillComponent,{
        data: {bill: bill},
      });
    }
  }

  ngOnInit(){
    let userid = this.storage.get("userid");

    this.expenseservice.getexpense(userid).subscribe(
      d => {
        console.log(d);
        d.map(e => {
          if(e.userid === userid){
           this.expenseArray.push(e);
           console.log(this.expenseArray);
          }
        })
      }
    )

    this.expenseservice.expenses = this.expenseArray;
    this.autoexpArray = this.expenseservice.expenses;
  }

}
