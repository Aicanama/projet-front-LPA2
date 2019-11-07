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


  increment(): Observable<Counter>{
    this.httpClient.patch("https://lp4asgadot.herokuapp.com/counters/51.json",{"value" : 1}).subscribe();
    return this.httpClient.get<Counter>("https://lp4asgadot.herokuapp.com/counters/51.json");
  }

  getCounterValue(id : number): Observable<Counter> {
    return this.httpClient.get<Counter>("https://lp4asgadot.herokuapp.com/counters/51.json")
  }
  
}
