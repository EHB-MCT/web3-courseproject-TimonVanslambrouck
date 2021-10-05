import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor() { }

  public time = 30;

  ngOnInit(): void {
    this.timerFunction();
  }

  timerFunction(){
    setTimeout(() => {
      if (this.time == 0) {
        return
      } else {
        this.time--;
        this.timerFunction();
      }      
    }, 1000);
  }

  submitAnswer(answer: number){
    console.log("user chose answer " + answer);
  }

}
