import { Component, OnInit, Input } from '@angular/core';
import { CounterService } from '../counter.service';
import { Counter } from '../counter';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-counter-content',
  templateUrl: './counter-content.component.html',
  styleUrls: ['./counter-content.component.css']
})
export class CounterContentComponent implements OnInit {

  counter: Counter;
  
  constructor(private route : ActivatedRoute, private counterService: CounterService, private location: Location) { }

  ngOnInit() {
    this.getCounter();
  }

  getCounter() {
    this.route.params.subscribe(
      params => {
        this.counterService.getCounter(params['id'])
          .subscribe(counter => 
            this.counter = counter);
      });
  }


  increment() {
    this.counterService.increment(this.counter.id)
      .subscribe(counter => {
        this.counter.value = counter.value;
      });
  
}
}
