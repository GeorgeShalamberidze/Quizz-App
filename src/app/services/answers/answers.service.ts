import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  private answersArray: any = [];
  private answers$ = new BehaviorSubject<Array<any>>([]);

  getAnswers() {
    return this.answers$.asObservable();
  }

  addAnswer(questionID: number, answerId: number, correctAnswerID: number) {
    let answer = { questionID, answerId, correctAnswerID };

    this.answersArray[questionID - 1] = answer;
    this.answers$.next(this.answersArray);
  }

  resetAnswers() {
    this.answers$.next([]);
  }

  constructor() {}
}
