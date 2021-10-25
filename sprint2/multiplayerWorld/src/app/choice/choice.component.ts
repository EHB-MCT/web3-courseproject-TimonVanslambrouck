import { SocketService } from './../socket.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private socketService: SocketService
  ) { }

  joinForm = this.formBuilder.group({
    name: '',
    color: ''
  })

  joinWorld(){
    let form = this.joinForm.value;
    this.socketService.userData = {
      name: form.name,
      color: form.color
    }
    window.location.href = '';

  }

  ngOnInit(): void {
  }

}
