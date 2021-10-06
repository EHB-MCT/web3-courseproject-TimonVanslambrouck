import { IQuestion } from './question';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private apiKey = 'JSM2A5XyDOlJRxcZXllvUnIH503CojXgjtukbq6Y';
  private fetchUrl = `https://quizapi.io/api/v1/questions`;
  private category = 'linux';
  private difficulty = 'easy';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getQuestions(): Observable<IQuestion[]>{
    return this.httpClient.get<IQuestion[]>(`${this.fetchUrl}?apiKey=${this.apiKey}&category=${this.category}&difficulty=${this.difficulty}&limit=10`)
  }
}
