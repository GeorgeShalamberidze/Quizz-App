import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Answer } from 'src/app/interfaces/IAnswer';

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  private answersArray: Answer[] = [];
  private _answers$ = new BehaviorSubject<Answer[]>(this.answersArray);

  getAnswers$(): Observable<Answer[]> {
    return this._answers$.asObservable();
  }

  getAnswers(): Answer[] {
    return this._answers$.getValue();
  }

  addAnswer(
    questionID: number,
    answerID: number,
    correctAnswerID: number
  ): void {
    let answer = { questionID, answerID, correctAnswerID };
    this.answersArray.push(answer);
    this._answers$.next(this.answersArray);
  }

  resetAnswers(): void {
    this.answersArray = [];
    this._answers$.next([]);
  }

  constructor() {}
}
