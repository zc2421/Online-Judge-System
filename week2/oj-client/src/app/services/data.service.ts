import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import {Problem } from '../models/problem.model';
import {error} from "selenium-webdriver";

@Injectable({
  providedIn: 'root'
})
export class DataService {
    //problems: Problem[] = PROBLEMS;
  private _problemSource = new BehaviorSubject<Problem[]>([]);
  constructor(private httpClient: HttpClient) { }
  // getProblems(): Problem[]  {
  //   return this.problems;
  // }
  // getProblem(id: number): Problem {
  //   return this.problems.find((problem) => problem.id === id);
  // }
  // addProblem(problem: Problem) {
  //   // assign problem id
  //   problem.id = this.problems.length + 1;
  //   // add to the end of problem list
  //   this.problems.push(problem);
  // }

  getProblems(): Observable<Problem[]> {
    this.httpClient.get('api/v1/problems')
      .toPromise()
      .then((res: any) => {
        // .next: next data
        this._problemSource.next(res);
      })
      .catch(this.handleError);
    return this._problemSource.asObservable();
  }

  getProblem(id: number) : Promise<Problem> {
    //httpClient return Observable type, toPromise converts to Promise
    return this.httpClient.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res:any) => res)
      .catch(this.handleError);
  }

  addProblem(problem: Problem){
    const options = {headers: new HttpHeaders( {'Content-Type': 'application/json'})};
    return this.httpClient.post('api/vi/problems', problem, options)
      .toPromise()
      .then((res: any) => {
        this.getProblems();
        return res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise <any> {
    return Promise.reject(error.body || error);
  }
}
