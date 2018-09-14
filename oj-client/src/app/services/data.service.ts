import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { PROBLEMS } from '../mock-problems';
import { HttpClient, HttpHeaders, HttpResponse } from  '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

 import { RequestOptions } from '@angular/http';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: HttpClient) { }

  getProblems(): Observable<Problem[]> {

 // this.http.get("api/v1/problems")
     //   .toPromise()
      //  .then((res: Response) => {

     //       this.problemsSource.next(res.json());
    //    })
//.catch(this.handleError);

      //  return this.problemsSource.asObservable();

        this.http.get('api/v1/problems')
          .toPromise()
          .then((res: any) => {
            this.problemsSource.next(res);
          })
          .catch(this.handleError);
      return this.problemsSource.asObservable();

  }

  getProblem(id: number): Promise<Problem> {
  		//return this.http.get(`api/v1/problems/${id}`)
       // .toPromise()
       // .then((res: Response) => res.json())
       // .catch(this.handleError);

       return this.http.get(`api/v1/problems/${id}`)
               .toPromise()
               .then()
               .catch(this.handleError);

  }


  addProblem(problem: Problem): Promise<Problem> {
  		
     // let headers = new Headers({ 'content-type': 'application/json'});

      //return this.http.post('api/v1/problems', problem, headers)
       // .toPromise()
       // .then((res: Response) => {

        //this.getProblems();
         //res.json();

        //})
        //.catch(this.handleError);

  
          const options = {
      header: new HttpHeaders({
        'Content-Type': 'applicaiton/json'
      })
    };
     return this.http.get('api/v1/problems')
               .toPromise()
               .then((res:any) => {
                 this.getProblems();
                 return res;
               })
               .catch(this.handleError);
  }


    private handleError(error: any): Promise<any> {

    console.error('An error occurred', error);

    return Promise.reject (error.body || error);
    }

}
