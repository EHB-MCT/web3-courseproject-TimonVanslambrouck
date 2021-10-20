import { Injectable } from '@angular/core';
import geckos, {Data} from '@geckos.io/client'

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public users = [];
  private channel = geckos({ port: 8081 }) // default port is 9208

  constructor(
  ) {
    this.channel.onConnect(error => {
      if (error) {
        console.error(error.message)
        return
      }
      this.channel.emit('get users', this.users);
      const user = {
        user: this.channel.id,
        positionX: 0,
        positionY: 0
      }

      this.channel.emit('add user', user)
    
      this.channel.on('chat message', (data:Data) => {
        console.log(`You got the message ${data}`)
        if (data == 'new user added') {
          this.channel.emit('get users', this.users);
        }
      })
    })
   }

}
