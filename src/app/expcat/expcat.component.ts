import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddexpcatComponent } from '../addexpcat/addexpcat.component';
import { ExpenseService } from 'src/app/expense.service';
import {SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-expcat',
  templateUrl: './expcat.component.html',
  styleUrls: ['./expcat.component.css']
})
export class ExpcatComponent implements OnInit {

  expcatArray:any=[];
  autoexpcatArray:any=[];

  constructor(private dialog: MatDialog,@Inject(SESSION_STORAGE) private storage: WebStorageService,private expenseservice: ExpenseService) { }

  openDialog() {
    this.dialog.open(AddexpcatComponent,{height:'350px',width:'400px'});
    }

  ngOnInit(){
    let userid = this.storage.get("userid");

    this.expenseservice.getexpcat(userid).subscribe(
      d => {
        d.map(e => {
          if(e.userid === userid){
            this.expcatArray.push(e);
            console.log(this.expcatArray);
          }
        })
      }
    )

    this.expenseservice.expensecategory = this.expcatArray;
    this.autoexpcatArray = this.expenseservice.expensecategory;
  }

}
