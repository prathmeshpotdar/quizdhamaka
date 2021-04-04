import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { QuizApiService } from '../quiz-api.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions = [];
  answer = false;
  num = 0;
  points = 0;
  ff=0;
  ex=0;
  i=0;
  c=0;
  df=0;
  de=0;
  wr=0;
  life=0;
  st=0;
  lo=0;
  
  constructor(private api : QuizApiService) {}

  ngOnInit(): void {
    this.start();
  }
  checkAnswer(correct_answer:String,your_answer:String){
    this.answer = correct_answer==your_answer ? true:false;
    this.answer ? this.points += 1000 : this.points += 0;
    this.answer ? this.wr=0 : this.wr=1;
    this.answer ? this.life=0 : this.life=1;
    this.num < this.questions.length ? this.num += 1 : null;
    this.lo=1;
    if(this.ff===1){
      this.ff=2;
    }
    if(this.ex===1){
      this.ex=2;
    }  
  }
  
m(){
  this.st=0;
  this.lo=0;
}

s(){
  this.st=1;
  this.start();
}

  fifty(){
    this.df=1;
    this.ff=1;
    for(this.i=0;this.i<4 && this.c<2;this.i++){
    if(this.questions[this.num].incorrect_answers[this.i]!=this.questions[this.num].correct_answer){
      this.questions[this.num].incorrect_answers.splice(this.i,1);
      this.c=this.c+1;
    }}
    this.questions[this.num].incorrect_answers.sort(() => .5 - Math.random());//Shuffling options
  }

  expert(){
    this.ex=1;
    this.de=1;
  }

start(){
  this.questions = [];
  this.api.getQuiz().subscribe(async res => {
    let quiz = res['results'];
    quiz.forEach(element => {
      element.incorrect_answers.push(element.correct_answer);
      element.incorrect_answers.sort(() => .5 - Math.random());//Shuffling options
    });
    this.questions = await quiz;
    this.num = 0;
    this.points = 0;
    this.ff=0;
    this.ex=0;
    this.i=0;
    this.c=0;
    this.df=0;
    this.de=0;
    this.wr=0;
    this.life=0;
    this.lo=0;
  });
}
}
