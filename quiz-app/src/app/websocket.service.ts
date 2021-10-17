import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private websocket: WebSocket = new WebSocket('ws://localhost:8081')
  public scores:string[] = [];
  public studentList:string[]=[];
 public name:string = '';

  constructor(
  ) {
    this.websocket.onopen = () => {
      console.log('Connection opened!');
    }
    this.websocket.onclose = () => {
      console.log('Connection closed!');
    }    
    this.websocket.onmessage = ({data}) => {
      console.log('got message');
      try {
        data.text().then((text: string) => this.handleData(text))
      } catch (error) {
        console.log(error);
      }
     
    }
   }

  public sendData(data:string){
      this.websocket.send(data);
  }

  private handleData(text: string) {
    if (text.split(" ")[0] == 'user') {
      if (text.split(" ")[2] == 'student') {
        this.studentList.push(text.split(" ")[1])
      } 
    }
    if (text.split(" ")[0] == 'start') {
      window.location.href = `questions/${this.name}`;
    }
    if (text.split(" ")[0] == 'score') {
      this.scores.push(text);
    }
  }
}

