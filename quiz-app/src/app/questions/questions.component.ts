import { WebsocketService } from './../websocket.service';
import { QuestionsService } from './../questions.service';
import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../question';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor(
    private questionService: QuestionsService,
    private websocketService: WebsocketService,
    private route: ActivatedRoute,
    ) { }
    
    public timerDone = false;
  private name:string = this.route.snapshot.params.name;
  public dataLoaded = false;
  public currentQuestion = {} as any;
  private currenQuestionNumber = 0;
  private score = 0;
  public scores:string[] = [];
  public time = 15;
  public showAnswer = [true, true, true, true, true ,true]
  public questionList!: IQuestion[];

  timerFunction() {
    setTimeout(() => {
      if (this.time == 0) {
        if (this.allEqual(this.showAnswer)) {
          this.websocketService.sendData(`score ${this.score}`);
        }
        this.currenQuestionNumber++;
        this.timerDone = true;
      } else {
        this.time--;
        this.timerFunction();
      }
    }, 1000);
  }

  submitAnswer(answer: number, answerString:string) {
    this.showAnswer = [false, false, false, false, false, false];
    this.showAnswer[answer - 1] = true;
    if (this.currentQuestion.correct_answer == answerString) {
      this.score++;      
    }
    this.websocketService.sendData(`score ${this.name}: ${this.score}`);
  }

  allEqual(array: boolean[]) {
    return array.every(v => v === array[0]);
  }

  ngOnInit(): void {
    this.scores=this.websocketService.scores;
    this.questionService.getQuestions()
    .subscribe(
      (data) => {
        this.questionList = data;
        console.log(data);
        this.startQuiz()
        
      }
    )
  }
  startQuiz() {
    this.currentQuestion = this.questionList[this.currenQuestionNumber];
    this.dataLoaded = true;
    this.timerFunction();

  }

}
