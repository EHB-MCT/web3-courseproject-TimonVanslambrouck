import { Injectable } from '@angular/core';
import geckos from '@geckos.io/client'

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private channel = geckos({ port: 8081 }) // default port is 9208

  constructor(
  ) {
    this.channel.onConnect(error => {
      if (error) {
        console.error(error.message)
        return
      }
    
      this.channel.on('chat message', data => {
        console.log(`You got the message ${data}`)
      })
    
      this.channel.emit('chat message', 'a short message sent to the server')
    })
   }

}
