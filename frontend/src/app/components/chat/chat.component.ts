import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChatService } from 'src/app/service/chat/chat.service';
import * as userSelector from '../../store/user/user.selector';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  roomId!: string;
  messageText!: string;
  messageArray!: { user: string; message: string }[];
  phone!: string;
  currentUser!: any;
  selectedUser!: any;
  itenaryId!: string;
  guideDetails!: any;

  constructor(
    private chatService: ChatService,
    private store: Store,
    private activateRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((params) => [
      (this.itenaryId = params['id']),
    ]);
    this.store.select(userSelector.selectUserState).subscribe((response) => {
      this.currentUser = response.user?.id;
    });
    this.userService
      .getGuideId(this.currentUser, this.itenaryId)
      .subscribe((response) => {
        // console.log(response.guideDetails);
        this.guideDetails = response.guideDetails[0];
        this.guideDetails.roomId = 1
      });
    this.chatService
      .getMessage()
      .subscribe((data: { user: string; message: string }) => {
        this.messageArray.push(data);
      });
  }

  selectUserHandler(emailId: string) {
    
  }
}
