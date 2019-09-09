import { Component, OnInit } from '@angular/core';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';
import { ActivatedRoute, Router } from '@angular/router';
import { TableServiceService } from '../table-service.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  usernameUser = '';
  idUser: number;

  userId = '';
  currentUser = <any>{};
  messages = [];
  currentRoom = <any>{};
  roomUsers = [];
  userRooms = [];
  newMessage = '';
  newRoom = {
    name: '',
    isPrivate: false
  };
  joinableRooms = [];
  newUser = '';

  constructor(private route: ActivatedRoute, private tableService: TableServiceService, private rooter: Router) { }

  ngOnInit() {
    this.idUser = parseInt(this.route.snapshot.paramMap.get("id"));
    console.log(this.idUser);

    new Promise((resolve, reject) => {
      this.tableService.getUserUsername(this.idUser).toPromise().then(
        (res: string) => {
          console.log(res);
          switch(res) {
            case "No user with that id":
            case "problem while executing query":
            case "problem while preparing query": reject(res); break;
            default: resolve(res);
          }
        }
      );
    }).then((res: string)=>{
      this.usernameUser = res;
      this.addUser();
    }, (res: string)=> {
      this.rooter.navigateByUrl('/signin');
    });
  }

  createRoom() {
    const { newRoom: { name, isPrivate }, currentUser } = this;

    if (name.trim() === '') return;

    currentUser.createRoom({
      name,
      private: isPrivate,
    }).then(room => {
      this.connectToRoom(room.id);
      this.newRoom = {
        name: '',
        isPrivate: false,
      };
    })
    .catch(err => {
      console.log(`Error creating room ${err}`)
    })
  }

  getJoinableRooms() {
    const { currentUser } = this;
    currentUser.getJoinableRooms()
    .then(rooms => {
      this.joinableRooms = rooms;
    })
    .catch(err => {
      console.log(`Error getting joinable rooms: ${err}`)
    })
  }

  joinRoom(id) {
    const { currentUser } = this;
    currentUser.joinRoom({ roomId: id })
    .catch(err => {
      console.log(`Error joining room ${id}: ${err}`)
    })
  }

  connectToRoom(id) {
    this.messages = [];
    const { currentUser } = this;

    currentUser.subscribeToRoom({
      roomId: `${id}`,
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          this.messages.push(message);
        },
        onPresenceChanged: () => {
          this.roomUsers = this.currentRoom.users.sort((a) => {
            if (a.presence.state === 'online') return -1;

            return 1;
          });
        },
      },
    })
    .then(currentRoom => {
      this.currentRoom = currentRoom;
      this.roomUsers = currentRoom.users;
      this.userRooms = currentUser.rooms;
    });
  }

  sendMessage() {
    const { newMessage, currentUser, currentRoom } = this;

    if (newMessage.trim() === '') return;

    currentUser.sendMessage({
      text: newMessage,
      roomId: `${currentRoom.id}`,
    });

    this.newMessage = '';
  }

  addUser() {
    const userId = this.usernameUser;
    axios.post('http://localhost:5200/users', {userId})
      .then(() => {
        const tokenProvider = new Chatkit.TokenProvider({
          url: 'http://localhost:5200/authenticate'
        });
        const chatManager = new Chatkit.ChatManager({
          instanceLocator: 'v1:us1:51098f41-e0d6-48d9-8021-06896735bceb',
          userId,
          tokenProvider
        });
        return chatManager
          .connect({
            onAddedToRoom: room => {
              this.userRooms.push(room);
              this.getJoinableRooms();
            },
          })
          .then(currentUser => {
            this.currentUser = currentUser;
            this.connectToRoom('560e768e-ff6c-4150-a205-21b67c28a708');
            this.getJoinableRooms();
          });
      })
        .catch(error => console.error(error));
  }

  addUserToRoom() {
    const { newUser, currentUser, currentRoom } = this;
    currentUser.addUserToRoom({
      userId: newUser,
      roomId: currentRoom.id
    })
      .then((currentRoom) => {
        this.roomUsers = currentRoom.users;
      })
      .catch(err => {
        console.log(`Error adding user: ${err}`);
      });

    this.newUser = '';
  }

}
