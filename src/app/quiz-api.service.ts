import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizApiService {

  constructor(private http : HttpClient) { }
  getQuiz() : Observable<Object> {
    return this.http.get('https://opentdb.com/api.php?amount=5&category=9&type=multiple')
  }
}
