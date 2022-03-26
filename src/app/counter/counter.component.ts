import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  show = true;
  time = 0;
  ptime = 0;
  interval: any;
  min = '05';
  sec = '00';
  loop = true;
  constructor() { }

  init() {
    clearInterval(this.interval);
    this.show = false;
    this.time = this.ptime;
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    if (this.time > 0) {
      if (this.time === 60) {
        const audio = new Audio('../../assets/airhorn.mp3');
        audio.play();
      }
      this.time -= 1;
      this.format(this.time);
    } else {
      if (this.loop) {
        this.time = this.ptime;
        this.show = false;
      } else {
        this.stop();
      }
      const audio = new Audio('../../assets/alarm.mp3');
      audio.play();
    }
  }

  stop() {
    this.show = true;
    clearInterval(this.interval);
  }

  format(now) {
    this.min = (now / 60 | 0).toString().padStart(2, '0');
    this.sec = (now % 60 | 0).toString().padStart(2, '0');
  }
}

