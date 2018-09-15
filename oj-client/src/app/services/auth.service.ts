//import { Injectable } from '@angular/core';
//import { filter } from 'rxjs/operators';
//import * as auth0 from 'auth0-js';

//(window as any).global = window;

//@Injectable()
//export class AuthService {

 // auth0 = new auth0.WebAuth({
 //   clientID: 'zIBh64zp56gR9DUAhzXc0KL8N2ud1gzy',
 //   domain: 'mocs.auth0.com',
 //   responseType: 'token id_token',
  //  redirectUri: 'http://localhost:3000/callback',
 //   scope: 'openid'
 // });

//  constructor(public router: Router) {}

 // public login(): void {
 //   this.auth0.authorize();
 // }
  
//}




import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import {Auth0Lock} from 'auth0-lock';

import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

//const Auth0Lock = require('auth0-lock').default;
 //declare var Auth0Lock: any;
 
 @Injectable()
export class Auth {
   // configure Auth0
  clientID = 'zIBh64zp56gR9DUAhzXc0KL8N2ud1gzy';
  domain = 'mocs.auth0.com';

   lock = new Auth0Lock(this.clientID, this.domain, {});
  constructor(private http: Http) {
      // this.lock.on("authenticated", (authResult)=>{
      // localStorage.setItem('id_token', authResult.idToken);
    //});
  }
   public login(): Promise<Object>{
    // call the show method to display the widget
    //this.lock.show();
  
 return new Promise((resolve, reject) => {
      this.lock.show((error: string, profile: Object, id_token: string) => {
        if (error) {
        //  console.log(error);       
         reject(error);
        } else {
          localStorage.setItem('profile', JSON.stringify(profile));
          localStorage.setItem('id_token', id_token);
         resolve(profile);
        }
      });
     })
  }
   public authenticated(){
    // Check if there is any expired JWT
    // This searches for an item in localStorage with key == "id_token"
    return tokenNotExpired();
  }
   public logout(){
    // Remove token from localstorage
    localStorage.removeItem('id_token');
        localStorage.removeItem('profile');

  }



   public getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

    public resetPassword(): void {
    let profile = this.getProfile();
    let url: string = `https://${this.domain}/dbconnections/change_password`;
    let headers = new Headers({ 'content-type': 'application/json' });
    let body = {
        client_id: this.clientID,
        email: profile.email,
        connection: 'Username-Password-Authentication'
    }
    
    this.http.post(url, body, headers)
      .toPromise()
      .then((res: Response) => {
        console.log("We have sent you an email! Please check it!!!")
        //console.log(res.json());
      })
      .catch(this.handleError);

  }


   private handleError(error: any): Promise<any> {
    console.error('Error occurred', error);
    return Promise.reject(error.message || error);
  }



 } 