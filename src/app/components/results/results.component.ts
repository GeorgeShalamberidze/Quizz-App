import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/interfaces/IAnswer';
import { AnswersService } from 'src/app/services/answers/answers.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  correctAnswers: number = 0;
  result!: string;
  constructor(private answersService: AnswersService) {}

  ngOnInit(): void {
    this.answersService.getAnswers$().subscribe((data: Answer[]) => {
      if (data.length === 3) {
        this.correctAnswers = data.filter(
          (ans) => ans.answerID === ans.correctAnswerID
        ).length;
        this.result = this.correctAnswers > 1 ? 'Extrovert' : 'Introvert';
      }
    });
  }

  reset(): void {
    this.answersService.resetAnswers();
    this.correctAnswers = 0;
  }
}
