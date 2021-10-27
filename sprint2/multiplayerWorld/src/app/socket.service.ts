import {
  Injectable
} from '@angular/core';
import geckos, {
  ChannelId,
  Data
} from '@geckos.io/client';
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public users:any = [];
  public removeUser = '';
  public userData:any;
  public currentUser:ChannelId;
  private channel = geckos({
    port: 8081
  }) // default port is 9208

  constructor() {
    this.channel.onConnect(error => {
      this.currentUser = this.channel.id;
      if (error) {
        console.error(error.message)
        return
      }

      this.channel.on('get users', (data: any) => {
        let currentUser = this.currentUser;
        let tempArray = _.remove(data, function (n: any) {
          return n.user == currentUser;
        })
        this.users = data;
      })

      const user = {
        user: this.channel.id,
        positionX: 0,
        positionY: 0.5,
        positionZ: 0.5
      }

      this.channel.emit('add user', user)

      this.channel.on('chat message', (data: Data) => {
        console.log(`You got the message ${data}`)
        if (data == 'new user added' || data == 'update user') {
          this.channel.emit('get users', this.users);
        }
      })
    })
  }

  updateUser(positionX: any, positionY: any, positionZ: any) {
    this.channel.onConnect(error => {
      if (error) {
        console.error(error.message)
        return
      }
      this.channel.emit('update user', {
        user: this.currentUser,
        positionX: positionX,
        positionY: positionY,
        positionZ: positionZ
      })
    })
  }

}
