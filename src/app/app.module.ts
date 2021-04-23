import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChartsModule } from 'ng2-charts';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expense/expense.component';
import { IncomeComponent } from './income/income.component';
import { InccatComponent } from './inccat/inccat.component';
import { ExpcatComponent } from './expcat/expcat.component';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { AddincomeComponent } from './addincome/addincome.component';
import { BillComponent } from './expense/bill/bill.component';
import { AddexpcatComponent } from './addexpcat/addexpcat.component';
import { AddinccatComponent } from './addinccat/addinccat.component';
import { BarchartComponent } from './home/barchart/barchart.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from 'src/app/login/signin/signin.component';
import { ExpenseService } from 'src/app/expense.service';
import { BarchartexpComponent } from './home/barchartexp/barchartexp.component';
import { PiechartComponent } from './home/piechart/piechart.component';
import { PiechartexpComponent } from './home/piechartexp/piechartexp.component';
import { NobillComponent } from './expense/nobill/nobill.component';
import { ForpassComponent } from './login/forpass/forpass.component';
import { VerifyotpComponent } from './login/verifyotp/verifyotp.component';
import { ResetpassComponent } from './login/resetpass/resetpass.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'forgotpass', component: ForpassComponent},
  { path: 'verifyotp', component: VerifyotpComponent},
  { path: 'resetpassword', component: ResetpassComponent},
  {
    path: 'navigation',component: NavigationComponent,
    children: [
      { path: '',redirectTo: 'home', pathMatch:'full'},
      { path: 'home', component: HomeComponent},
      { path: 'expense', component: ExpenseComponent },
      { path: 'expcat', component: ExpcatComponent }, 
      { path: 'income', component: IncomeComponent },
      { path: 'inccat', component: InccatComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeaderComponent,
    HomeComponent,
    ExpenseComponent,
    IncomeComponent,
    InccatComponent,
    ExpcatComponent,
    AddexpenseComponent,
    AddincomeComponent,
    BillComponent,
    AddexpcatComponent,
    AddinccatComponent,
    BarchartComponent,
    LoginComponent,
    SigninComponent,
    BarchartexpComponent,
    PiechartComponent,
    PiechartexpComponent,
    NobillComponent,
    ForpassComponent,
    VerifyotpComponent,
    ResetpassComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ChartsModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    MaterialFileInputModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ExpenseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
