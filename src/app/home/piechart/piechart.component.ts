import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ExpenseService } from 'src/app/expense.service';
import {SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  incomeArray:any=[];   //this is not required only for the refrence
  graphData: any=[];
  catIncome = {
    Salary: 0,
    Shares: 0,
    Others: 0
  }

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,private expenseservice: ExpenseService) { }

  ngOnInit(){
    this.getAllIncomes();
  }

  /*piechartdata(){
  }*/

  getAllIncomes(): void {
    let userid = this.storage.get("userid");
    this.expenseservice.getincome(userid).subscribe(
      d => {
        d.map(e => {
          if (e.userid === userid) {
            this.additionOfList(e);
            this.incomeArray.push(e);
          }
          //console.log(this.incomeArray,'this is income array in piechart')
        })
      }
    )
  }

  additionOfList(item): void {
    if(item.inccat == 'Salary'){
      this.catIncome["Salary"] += parseInt(item.incamt);
    }
    if(item.inccat == 'Shares'){
      this.catIncome["Shares"] += parseInt(item.incamt);
    }
    if(item.inccat !== 'Salary' && item.inccat !== 'Shares'){
      this.catIncome["Others"] += parseInt(item.incamt);
    }

    this.graphData = [this.catIncome.Salary,this.catIncome.Shares,this.catIncome.Others];
    //console.log(this.graphData);

    var ctxP = <HTMLCanvasElement> document.getElementById("pieChart");
    var myPieChart = new Chart(ctxP, {
      type: 'pie',
      data: {
        labels: ["Salary", "Shares", "Others"],
        datasets: [{
          data: this.graphData,
          backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
          hoverBackgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"]
        }]
      },
      options: {
        responsive: true
      }
    });
  }

}
