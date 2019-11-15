import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Counter } from './counter';
import { ActionCableService, Channel } from 'angular2-actioncable';

@Injectable({
  providedIn: 'root'
})

export class CounterService {
  
  subscription: Subscription;
  public positionCounter = [49, 72, 48];

  private counterObservable: Map<number, Observable<Counter>>= new Map(); //partage donnee objet qu'on peut retrourner + dico 

  constructor(private httpClient : HttpClient,  private cableService: ActionCableService ) {
  // Open a connection and obtain a reference to the channel
  const channel: Channel = this.cableService
  .cable('wss://lp4asgadot.herokuapp.com/cable')
  .channel('CountersChannel ', {});

    // Subscribe to incoming messages
    this.subscription = channel.received().subscribe(message => {
        console.log(message)
    });
}
  reset() {
  }


  increment(id: number): Observable<Counter>{
    return this.httpClient.patch<Counter>("https://lp4asgadot.herokuapp.com/counters/"+id+".json", {});
  }

  getCounter(id : number): Observable<Counter> {
    if (! this.counterObservable.has(id)) {
      this.counterObservable[id] = new EventEmitter<Counter>() 
    }
    this.httpClient.get<Counter>("https://lp4asgadot.herokuapp.com/counters/"+this.positionCounter[id]+".json")
                   .subscribe(counter =>  this.counterObservable[id].emit(counter))
    return this.counterObservable[id]
  }
  
  getCounters(): Observable<Counter[]> {
    return this.httpClient.get<Counter[]>("https://lp4asgadot.herokuapp.com/counters.json");
  }

}

  

