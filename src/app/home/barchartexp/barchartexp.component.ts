import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/expense.service';
import {SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-barchartexp',
  templateUrl: './barchartexp.component.html',
  styleUrls: ['./barchartexp.component.css']
})
export class BarchartexpComponent implements OnInit {

  expenseArray:any=[];    //this expense array is not required this is only for the refrence 
  graphData: any=[];
  monthIncome = {
    jan: 0,
    feb: 0,
    march: 0,
    apr: 0,
    may: 0,
    jun: 0,
    july: 0,
    aug: 0,
    sept: 0,
    oct: 0,
    nov: 0,
    dec: 0,
  }

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,private expenseservice: ExpenseService) { }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

    public mbarChartLabels:string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct' ,'Nov', 'Dec'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;
  
    public barChartColors:Array<any> = [
    {
      backgroundColor: '#5d9fd9',
      borderColor: 'rgba(105,159,177,1)',
      pointBackgroundColor: 'rgba(105,159,177,1)',
      pointBorderColor: '#fafafa',
      pointHoverBackgroundColor: '#fafafa',
      pointHoverBorderColor: 'rgba(105,159,177)'
    },
    /*{ 
      backgroundColor: 'rgba(77,20,96,0.3)',
      borderColor: 'rgba(77,20,96,1)',
      pointBackgroundColor: 'rgba(77,20,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,20,96,1)'
    }*/
  ];
    public barChartData:any[] = [
      {data: this.graphData, label: 'Monthly Expense'},
      //{data: [58, 55, 60, 79, 66, 57, 90], label: 'Company B'}
    ];
  
    // events
    public chartClicked(e:any):void {
      //console.log(e);
    }
  
    public chartHovered(e:any):void {
      //console.log(e);
    }
  
    public randomize():void {
      let data = [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        (Math.random() * 100),
        Math.round(Math.random() * 100),
        (Math.random() * 100),
        Math.round(Math.random() * 100)];
      let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = data;
      this.barChartData = clone;
    }

  ngOnInit(){
    this.getAllExpenses();
  }

  getAllExpenses(): void {
    let userid = this.storage.get("userid");
    this.expenseservice.getexpense(userid).subscribe(
      d => {
        d.map(e => {
          if(e.userid === userid){
            this.additionOfList(e);
            this.expenseArray.push(e);
          }
          //console.log(this.expenseArray,'expense array');
        })
      }
    )
  }

  additionOfList(item): void {
    var monthList = Object.keys(this.monthIncome);
    const convertedMonth = new Date(item.expdate).getMonth()
    this.monthIncome[monthList[convertedMonth]] += parseInt(item.expamt);
    //console.log(this.monthIncome,'this is month income');
    this.graphData = [this.monthIncome.jan,this.monthIncome.feb,this.monthIncome.march,this.monthIncome.apr,this.monthIncome.may,this.monthIncome.jun,this.monthIncome.july,this.monthIncome.aug,this.monthIncome.sept,this.monthIncome.oct,this.monthIncome.nov,this.monthIncome.dec]
    this.barChartData = [{data: this.graphData, label:'Monthly Expense'}];
    //console.log(this.graphData,'this is graph data');
  }

}
