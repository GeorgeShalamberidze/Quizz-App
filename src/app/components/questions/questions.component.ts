import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions/questions.service';
import { Question } from '../../interfaces/IQuestion';
import { TimerService } from 'src/app/services/timer/timer.service';
import { Router } from '@angular/router';
import { AnswersService } from 'src/app/services/answers/answers.service';
import { Subscription } from 'rxjs';
import { Answer } from 'src/app/interfaces/IAnswer';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  questions!: Question[];
  questionIndex: number = 1;
  timerCount!: number;
  answersArr!: any;
  answerindices: number[] = [];

  questionsSub!: Subscription;
  answersSub!: Subscription;

  constructor(
    private questionsService: QuestionsService,
    private timerService: TimerService,
    private router: Router,
    private answersService: AnswersService
  ) {
    this.questionsSub = this.questionsService
      .getQuestions()
      .subscribe((data: Question[]) => {
        this.questions = data;
      });
    this.answersSub = this.answersService
      .getAnswers$()
      .subscribe((data: Answer[]) => {
        this.answersArr = data;
      });
  }

  getCurrentProgress(): number {
    return Math.round((this.answersArr.length / 3) * 100);
  }

  handlePrevClick() {
    this.questionIndex = Math.max(this.questionIndex - 1, 1);
  }

  handleNextClick() {
    this.questionIndex = Math.min(this.questionIndex + 1, 3);
  }

  onAnswerSelected(
    questionID: number,
    answerID: number,
    correctAnswerID: number
  ) {
    this.answerindices[this.questionIndex] = answerID;
    this.answersService.addAnswer(questionID, answerID, correctAnswerID);
  }

  ngOnInit(): void {
    this.timerService.startTimer();
    this.timerService.getTimer$().subscribe((time: number) => {
      this.timerCount = time;

      if (this.answersArr && this.questions) {
        if (this.answersArr.length !== this.questions.length && time < 1) {
          this.router.navigate(['/results']);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.timerService.resetTimer();
    this.questionsSub.unsubscribe();
    this.answersSub.unsubscribe();
  }
}
