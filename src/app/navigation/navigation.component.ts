import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ExpenseService } from 'src/app/expense.service';
import {SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  users: any=[];
  username : string;
  email : string;
  phone : number;

  constructor(private expenseservice: ExpenseService,@Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {

    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    let id = this.storage.get("userid");

    this.expenseservice.getuserbyid(id).subscribe(
      (data:any) => {
        let users = data;
        this.users=users.filter((k:any)=>k.id==+id);
        this.users.forEach(element => {
          this.username =element.username;
          this.email =element.email;
          this.phone = element.phone;
        });
      
        console.log( this.username,'this is username');
      }
    );

  }

}
