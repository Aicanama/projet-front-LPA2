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

  private counterObservable: Map<number, Observable<Counter>>= new Map(); //partage donnee objet qu'on peut retrourner + dico 

  constructor(private httpClient : HttpClient,  private cableService: ActionCableService ) {
  // Open a connection and obtain a reference to the channel
  const channel: Channel = this.cableService
                     .cable('wss://lp4asgadot.herokuapp.com/cable')
                     .channel('CountersChannel', {});

    // Subscribe to incoming messages
    this.subscription = channel.received().subscribe(message => {
      console.log(message, this.counterObservable[message.id]);

      if(this.counterObservable.has(message.id)) {
        console.log("emit");
        this.counterObservable[message.id].emit({id: message.id, name: message.name, value:message.value})
      }
    });
}
  reset() {
  }


  increment(position: number) {
    this.httpClient.patch<any>(".netlify/functions/increment", {counterId: position}).subscribe()
  }

  getCounter(id : number): Observable<Counter> {
    if (! this.counterObservable.has(id)) {
      this.counterObservable[id] = new EventEmitter<Counter>() 
    }
    this.httpClient.get<Counter>("https://lp4asgadot.herokuapp.com/counters/"+id+".json")
                   .subscribe(counter =>  this.counterObservable[id].emit(counter))
    return this.counterObservable[id]
  }
  
  getCounters(): Observable<Counter[]> {
    return this.httpClient.get<Counter[]>("https://lp4asgadot.herokuapp.com/counters.json");
  }

}

  

