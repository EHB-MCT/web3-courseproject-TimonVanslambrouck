import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public submitted = false;
  public isTeacher = false;
  public studentList:string[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private websocketService: WebsocketService,
  ) { }
  
  joinForm = this.formBuilder.group({
    username: '',
    role: ''
  })

  ngOnInit(): void {
  }

  onSubmit(){
    let formValues= this.joinForm.value;
    this.websocketService.sendData('user ' + formValues.username + ' ' + formValues.role);
    this.studentList = this.websocketService.studentList;
    this.submitted = true;
    this.websocketService.name = formValues.username;
    console.log(this.websocketService.name);
    if (formValues.role == 'teacher') {
      this.isTeacher = true;
    }
  }

  startQuiz(){
    this.websocketService.sendData('start');
  }

}
