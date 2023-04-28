import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from 'src/app/interfaces/IQuestion';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  getQuestions() {
    return this.http.get<Question[]>('assets/questions.json');
  }
}
