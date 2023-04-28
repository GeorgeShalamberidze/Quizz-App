import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Answer } from 'src/app/interfaces/IAnswer';

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  private answersArray: any = [];
  private _answers$ = new BehaviorSubject<Array<Answer>>(this.answersArray);

  getAnswers$(): Observable<Answer[]> {
    return this._answers$.asObservable();
  }

  getAnswers(): Answer[] {
    return this._answers$.getValue();
  }

  addAnswer(questionID: number, answerID: number, correctAnswerID: number) {
    let answer = { questionID, answerID, correctAnswerID };

    this.answersArray.push(answer);
    this._answers$.next(this.answersArray);
  }

  resetAnswers() {
    this.answersArray = [];
    this._answers$.next([]);
  }

  constructor() {}
}
