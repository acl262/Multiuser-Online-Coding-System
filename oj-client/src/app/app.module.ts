import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import {routing } from "./app.routes"; 

import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

import { DataService } from "./services/data.service";
import { Auth } from "./services/auth.service";
import { AuthGuardService } from "./services/auth-guard.service";


import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [{

  		provide: "data",
  		useClass: DataService

  },
   
    {
      provide:"auth",
      useClass:Auth
    },

    {
      provide:"authGuard",
      useClass:AuthGuardService
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
