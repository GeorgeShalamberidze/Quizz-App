import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions/questions.service';
import { Question } from '../../interfaces/IQuestion';
import { TimerService } from 'src/app/services/timer/timer.service';
import { Router } from '@angular/router';
import { AnswersService } from 'src/app/services/answers/answers.service';

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

  constructor(
    private questionsService: QuestionsService,
    private timerService: TimerService,
    private router: Router,
    private answersService: AnswersService
  ) {
    this.questionsService.getQuestions().subscribe((data: Question[]) => {
      this.questions = data;
      console.log(data);
    });
    this.answersService.getAnswers().subscribe((data: any) => {
      this.answersArr = data;
    });
  }

  getCurrentProgress(): number {
    return Math.round((this.questionIndex / 3) * 100);
  }

  handlePrevClick() {
    this.questionIndex = Math.max(this.questionIndex - 1, 1);
  }

  handleNextClick() {
    this.questionIndex = Math.min(this.questionIndex + 1, 3);
  }

  onAnswerSelected(
    questionId: number,
    answerId: number,
    correctAnswerID: number
  ) {
    this.answerindices[this.questionIndex] = answerId;
    this.answersService.addAnswer(questionId, answerId, correctAnswerID);
  }

  ngOnInit(): void {
    this.timerService.startTimer();
    this.timerService.getTimer().subscribe((time: number) => {
      this.timerCount = time;
    });
  }

  ngOnDestroy(): void {
    this.timerService.resetTimer();
    this.answersService.resetAnswers();
  }
}
