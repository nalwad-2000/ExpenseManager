import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddinccatComponent } from '../addinccat/addinccat.component';
import { ExpenseService } from 'src/app/expense.service';
import {SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-inccat',
  templateUrl: './inccat.component.html',
  styleUrls: ['./inccat.component.css']
})
export class InccatComponent implements OnInit {

  inccatArray: any=[];
  autoinccatArray: any=[];

  constructor(private dialog: MatDialog,@Inject(SESSION_STORAGE) private storage: WebStorageService,private expenseservice: ExpenseService) { }

  openDialog() {
    this.dialog.open(AddinccatComponent,{height:'350px',width:'400px'});
    }

  ngOnInit(){
    let userid = this.storage.get("userid");

    this.expenseservice.getinccat(userid).subscribe(
      d => {
        d.map(e => {
          if(e.userid === userid){
            this.inccatArray.push(e);
            console.log(this.inccatArray);
          }
        })
      }
    )

    this.expenseservice.incomecategory = this.inccatArray;
    this.autoinccatArray = this.expenseservice.incomecategory;
  }

}
