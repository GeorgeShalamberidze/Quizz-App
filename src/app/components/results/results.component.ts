import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/interfaces/IAnswer';
import { AnswersService } from 'src/app/services/answers/answers.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  answers!: Answer[];
  correctAnswers: number = 0;
  constructor(private answersService: AnswersService) {}

  ngOnInit(): void {
    this.answersService.getAnswers$().subscribe((data: Answer[]) => {
      this.answers = data;

      if (data.length === 3) {
        this.correctAnswers = this.answers.filter(
          (ans) => ans.answerID === ans.correctAnswerID
        ).length;
      }
    });
  }

  reset() {
    this.answersService.resetAnswers();
    this.correctAnswers = 0;
  }
}
