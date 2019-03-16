import { Component, Input, Output, OnInit, OnDestroy, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {


  @Input() init: number = null;
  @Output() decrease = new EventEmitter<number>();
  @Output() complete = new EventEmitter<void>();

  public counter = 0;
  private countdownTimerRef: any = null;

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }

  ngOnChanges(changes): void {
    console.log('init value updated to: ', changes.init.currentValue);
    this.startCountdown();
  }



  constructor() { }

  startCountdown() {
    if (this.init && this.init > 0) {
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown() {
    this.countdownTimerRef = setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCountdown();
    }, 1000);
  }

  private clearTimeout() {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  processCountdown() {
    this.decrease.emit(this.counter);
    console.log('count is ', this.counter);

    if (this.counter === 0) {
      this.complete.emit();
      console.log('--counter end--');
    } else {
      this.doCountdown();
    }
  }

}
