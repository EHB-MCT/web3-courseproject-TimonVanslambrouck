import { QuestionsService } from './../questions.service';
import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../question';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor(private questionService: QuestionsService) { }

  public dataLoaded = false;
  public currentQuestion = {} as any;
  private currenQuestionNumber = 0;
  public time = 30;
  public showAnswer = [true, true, true, true, true ,true]
  public showLate = false;
  public questionList!: IQuestion[];

  timerFunction() {
    setTimeout(() => {
      if (this.time == 0) {
        if (this.allEqual(this.showAnswer)) {
          this.timerFinished();
        }
        this.currenQuestionNumber++;
      } else {
        this.time--;
        this.timerFunction();
      }
    }, 1000);
  }
  timerFinished() {
    this.showAnswer = [false, false, false, false, false, false];
    this.showLate = true;
  }

  submitAnswer(answer: number) {
    console.log("user chose answer " + answer);
    this.showAnswer = [false, false, false, false, false, false];
    this.showAnswer[answer - 1] = true;
  }

  allEqual(array: boolean[]) {
    return array.every(v => v === array[0]);
  }

  ngOnInit(): void {
    this.questionService.getQuestions()
    .subscribe(
      (data) => {
        this.questionList = data
        this.startQuiz()
        
      }
    )
  }
  startQuiz() {
    console.log(this.questionList);
    this.currentQuestion = this.questionList[this.currenQuestionNumber];
    this.dataLoaded = true;
    this.timerFunction();

  }

}
