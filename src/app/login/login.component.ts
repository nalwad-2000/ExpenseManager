import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ExpenseService } from 'src/app/expense.service';
import {SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform : FormGroup;

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,private expenseservice: ExpenseService,private router: Router,private formbuilder: FormBuilder) { }

  ngOnInit(){
    this.loginform = this.formbuilder.group({
      loginuser: [''],
      loginpass: ['']
    })
  }

  login(value: any): void{
    this.expenseservice.getusers().subscribe(
      d => {
        d.map(e=>{
          if(e.username === value.loginuser && e.password === value.loginpass){
            this.router.navigate(['/navigation']);
            console.log(e.id);
            console.log(e);
            this.storage.set("userid",e.id);
            this.storage.set("username",e.username);
          }else{
            console.log("Invalid Credentials");
          }
        })
      }
    );
  }

}
