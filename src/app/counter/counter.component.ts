import { Component, OnInit, Input } from '@angular/core';
import { CounterService } from '../counter.service';
import { Counter } from '../counter';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})

export class CounterComponent implements OnInit {

  @Input() id : number;
  name: string;
  value: number;
  

  constructor(public counterService: CounterService, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.counterService.getCounter(this.id)
    .subscribe(counter => {
              this.value =  counter.value;
              this.name = counter.name;
              this.id=counter.id;
    });
  }



  increment() {
    this.counterService.increment(this.id)
      .subscribe(counter => {
        this.value = counter.value;
      });
  }

}

