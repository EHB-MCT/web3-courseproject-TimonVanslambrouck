import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor() { }

  public time = 30;
  showAnswer = [true, true, true, true]

  ngOnInit(): void {
    this.timerFunction();
  }

  timerFunction(){
    setTimeout(() => {
      if (this.time == 0) {
        this.timerFinished();
      } else {
        this.time--;
        this.timerFunction();
      }      
    }, 1000);
  }
  timerFinished() {
    console.log("timer finished");
  }

  submitAnswer(answer: number){
    console.log("user chose answer " + answer);
    this.showAnswer = [false, false, false, false];
    this.showAnswer[answer-1] = true;
  }

}
