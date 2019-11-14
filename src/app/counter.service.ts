import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Counter } from './counter';

@Injectable({
  providedIn: 'root'
})

export class CounterService {
  
  constructor(private httpClient : HttpClient) { }

  reset() {
  }


  increment(id: number): Observable<Counter>{
    return this.httpClient.patch<Counter>("https://lp4asgadot.herokuapp.com/counters/"+id+".json", {});
  }

  getCounter(id : number): Observable<Counter> {
    return this.httpClient.get<Counter>("https://lp4asgadot.herokuapp.com/counters/"+id+".json");
  }
  
  getCounters(): Observable<Counter[]> {
    return this.httpClient.get<Counter[]>("https://lp4asgadot.herokuapp.com/counters.json");
  }
  
}
