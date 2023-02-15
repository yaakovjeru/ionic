import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  chatForm:boolean = false;
  chatData:any = [
    {id:1, name: 'full name', location: 'תל אביב', phone: '0501112233', content: 'במצב מצויין', created: '12/12/2023 10:11:00'},
    {id:2, name: 'full name', location: 'תל אביב', phone: '0501112233', content: 'במצב מצויין', created: '12/12/2023 10:11:00'}
  ];

  constructor(){
    
  }

  sendMessage() {

  }

  joinChat(){

  }
}
