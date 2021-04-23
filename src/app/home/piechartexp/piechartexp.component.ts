import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ExpenseService } from 'src/app/expense.service';
import {SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-piechartexp',
  templateUrl: './piechartexp.component.html',
  styleUrls: ['./piechartexp.component.css']
})
export class PiechartexpComponent implements OnInit {

  expenseArray:any=[];    //this is not required but only for the refrence 
  graphData:any=[];
  catExpense = {
    Ele_Bill: 0,
    Water_Bill: 0,
    Others: 0
  }

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,private expenseservice: ExpenseService) { }

  public chartClicked(e:any):void {
    //console.log(e);
    }

    public chartHovered(e:any):void {
    //console.log(e);
    }


  ngOnInit(){
    this.getAllIncomes();
  }

  getAllIncomes(){
    let userid = this.storage.get("userid");
    this.expenseservice.getexpense(userid).subscribe(
      d => {
        d.map(e => {
          if (e.userid === userid) {
            this.additionOfList(e);
            this.expenseArray.push(e);
          }
          //console.log(this.expenseArray,'this is expense array in piechart')
        })
      }
    )
  }

  additionOfList(item): void{
    if(item.expcat == 'Electricity Bill'){
      this.catExpense["Ele_Bill"] += parseInt(item.expamt);
    }
    if(item.expcat == 'Water Bill'){
      this.catExpense["Water_Bill"] += parseInt(item.expamt);
    }
    if(item.expcat !== 'Electricity Bill' && item.expcat !== 'Water Bill'){
      this.catExpense["Others"] += parseInt(item.expamt);
    }
    //console.log(this.catExpense)
    this.graphData = [this.catExpense.Ele_Bill,this.catExpense.Water_Bill,this.catExpense.Others];
    
    var ctxP = <HTMLCanvasElement> document.getElementById("pieChart1");
    var myPieChart = new Chart(ctxP, {
      type: 'pie',
      data: {
        labels: ["Ele Bill", "Water Bill", "Others"],
        datasets: [{
          data: this.graphData,
          backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
          hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
        }]
      },
      options: {
        responsive: true
      }
    });
  }

}
