import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Counter } from './counter';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  public initialValue = [45, 6, 28];
  
  constructor(private httpClient : HttpClient) { }

  reset() {
    this.initialValue = [0 , 0, 0];
  }

  increment(position: number): number {
    this.initialValue[position]++;
    return this.initialValue[position];
  }

  getCounterValue(id : number): Observable<Counter> {
    return this.httpClient.get<Counter>("https://lp4asgadot.herokuapp.com/counters/"+id+".json")
  }
  
}
