import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  messages: any;
  editID: string;

  replyMessage: {
    to: string;
    from: string;
    message: string;
  } = { to: '', from: '', message: '' };
  constructor(private router: Router, private backend: BackendService) {
    this.getMessages();
  }

  getMessages() {
    return this.backend
      .getAllMessages()
      .then(response => {
        console.log('response', response);
        this.messages = response;
        console.log(this.messages[0]);
        return this.messages.sort((a,b) => {return a.created_at < b.created_at})
      })
      .catch(err => {
        console.log(err);
      });
  }

  reply(messageID) {
    this.editID = messageID;
    console.log(`reply to message ${messageID}`);
  }

  delete() {
    console.log('delete');
  }

  submit() {
    console.log(this.editID);
    let current = this.messages;
    current = current.filter(message => {
      console.log('message', message);
      return message['id'] === this.editID;
    });

    console.log('current', current[0].from.id);
    this.replyMessage['to'] = current[0].from.id;
    this.replyMessage['from'] = current[0].to.id;
    this.replyMessage['seller_id'] = current[0].seller_id;
    this.replyMessage['item_id'] = current[0].item_id;
    console.log(`submit ${this.replyMessage.message}`);
    console.log(this.replyMessage);
    return this.backend
      .postReply(this.replyMessage)
      .then(response => {
        this.editID = '';
        console.log(response);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  }
}
