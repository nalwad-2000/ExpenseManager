import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  expenses:any=[];
  expensecategory:any=[];
  incomes:any=[];
  incomecategory:any=[];
  otp:any;
  otpmail: any;

  constructor(private http:HttpClient) { }

  signin(value: any){
    return this.http.post<any>("http://localhost:8000/users",value);
  }

  resetpass(value: any){
    return this.http.post<any>("http://localhost:8000/resetpass",value);
  }

  sendotp(value: any){
    return this.http.post<any>("http://localhost:8000/sendotp",value);
  }

  addexpcat(value: any){
    return this.http.post<any>("http://localhost:8000/expense-category",value);
  }

  addexp(value: any){
    return this.http.post<any>("http://localhost:8000/expense",value);
  }

  addinc(value: any){
    return this.http.post<any>("http://localhost:8000/income",value);
  }

  addinccat(value: any){
    return this.http.post<any>("http://localhost:8000/income-category",value);
  }

  getusers(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:8000/users");
  }

  getotp(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:8000/sendotp")
  }

  getexpcat(userid:number): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:8000/expcat/"+userid);
  }

  getexpense(userid:number): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:8000/expense/"+userid);
  }

  getincome(userid:number): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:8000/income/"+userid);
  }

  getinccat(userid:number): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:8000/inccat/"+userid);
  }

  getuserbyid(id:number){
    return this.http.get("http://localhost:8000/users?id="+id);
  }

}
