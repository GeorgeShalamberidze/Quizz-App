import { Component, OnInit } from '@angular/core';
import { AnswersService } from 'src/app/services/answers/answers.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private answersService: AnswersService) {}

  reset(): void {
    this.answersService.resetAnswers();
  }

  ngOnInit(): void {}
}
