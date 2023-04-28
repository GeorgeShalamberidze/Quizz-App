import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  interval,
  takeWhile,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private countdown: number = 60;
  private timer$: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.countdown
  );
  private timerSub!: Subscription;

  getTimer(): Observable<number> {
    return this.timer$.asObservable();
  }

  startTimer() {
    if (!this.timerSub || this.timerSub.closed) {
      this.timerSub = interval(1000)
        .pipe(takeWhile(() => this.timer$.getValue() > 0))
        .subscribe(() => {
          let val = this.timer$.getValue();
          this.timer$.next(val - 1);
        });
    }
  }

  resetTimer(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
    if (!this.timerSub || this.timerSub.closed) {
      this.timer$.next(this.countdown);
    }
  }

  constructor() {}
}
