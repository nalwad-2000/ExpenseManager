import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddincomeComponent } from '../addincome/addincome.component';
import { ExpenseService } from 'src/app/expense.service';
import {SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  incomeArray:any=[];
  autoincArray:any=[];

  constructor(private dialog: MatDialog,@Inject(SESSION_STORAGE) private storage: WebStorageService,private expenseservice: ExpenseService) { }

  openDialog() {
    this.dialog.open(AddincomeComponent,{height:'510px',width:'400px'});
    }

  ngOnInit(){
    let userid = this.storage.get("userid");

    this.expenseservice.getincome(userid).subscribe(
      d => {
        d.map(e => {
          if(e.userid === userid){
            this.incomeArray.push(e);
            console.log(this.incomeArray);
          }
        })
      }
    )

    this.expenseservice.incomes = this.incomeArray;
    this.autoincArray = this.expenseservice.incomes;
  }

}
