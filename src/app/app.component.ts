import { Component, OnInit } from '@angular/core';
import { CounterService } from './counter.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService, private counterService: CounterService){};
  title = 'counters';

  reset(){
    this.counterService.reset();
  }
  
  ngOnInit() {
    this.auth.localAuthSetup();
    this.auth.handleAuthCallback();}

}
