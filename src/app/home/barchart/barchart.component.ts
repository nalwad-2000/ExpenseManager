import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ExpenseService } from 'src/app/expense.service';
import {SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  incomeArray: any=[];    //this income array is not required but only for the refrence
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
      {data: this.graphData, label: 'Monthly Income'},
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

  ngOnInit(): void {
    this.getAllIncomes();
  }

  getAllIncomes(): void {
    let userid = this.storage.get("userid");
    this.expenseservice.getincome(userid).subscribe(
      d => {
        d.map(e => {
          if (e.userid === userid) {
            this.additionOfList(e);
            this.incomeArray.push(e);
          }
          //console.log(this.incomeArray)
        })
      }
    )
  }

  additionOfList(item): void {
    var monthList = Object.keys(this.monthIncome);
    //console.log(monthList,'this is monthlist')
    const convertedMonth = new Date(item.incdate).getMonth()
    this.monthIncome[monthList[convertedMonth]] += parseInt(item.incamt);
    //console.log(this.monthIncome,'this is month income');
    this.graphData = [this.monthIncome.jan,this.monthIncome.feb,this.monthIncome.march,this.monthIncome.apr,this.monthIncome.may,this.monthIncome.jun,this.monthIncome.july,this.monthIncome.aug,this.monthIncome.sept,this.monthIncome.oct,this.monthIncome.nov,this.monthIncome.dec]
    this.barChartData = [{data: this.graphData, label:'Monthly Income'}];
    //console.log(this.graphData,'this is graph data');
  }
}
