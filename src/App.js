import React from 'react'
import Login from './components/Login'
import Messenger from './components/Messenger'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

import './App.css';

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/11786d99-29ae-472b-9833-a1fdbdb33541/token';
const CHATKIT_INSTANCE_LOCATOR = 'v1:us1:11786d99-29ae-472b-9833-a1fdbdb33541';
const CHATKIT_ROOM_ID = '19397310';

class App extends React.Component<Props> {
  state = {
    currentUser: null,
    currentRoom: null,
    rooms: [],
    roomUsers: [],
    roomName: null,
    messages: [],
    newMessage: '',
  }

  connectToChatkit = userId => {
    if (userId === null || userId.trim() === '') {
      alert('Invalid userId');
      return;
    }

    const tokenProvider = new TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
    });

    const chatManager = new ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId,
      tokenProvider: tokenProvider,
    });

    return chatManager
      .connect()
      .then(currentUser => {
        console.log('Connection successful');
        this.setState({
          currentUser
        });

        return currentUser.subscribeToRoom({
          roomId: CHATKIT_ROOM_ID,
          hooks: {
            onMessage: this.onReceive,
          },
        })
        .then(currentRoom => {
          this.setState({
            currentRoom,
            roomUsers: currentRoom.users,
            rooms: currentUser.rooms,
            roomName: currentRoom.name,
          });
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  onReceive = message => {
    this.setState({
      messages: [...this.state.messages, message],
    });
  };

  sendMessage = (event) => {
    event.preventDefault();
    const { newMessage, currentUser, currentRoom } = this.state;

    if (newMessage.trim() === '') return;

    currentUser.sendMessage({
      text: newMessage,
      roomId: `${currentRoom.id}`,
    });

    this.setState({
      newMessage: '',
    });
  }

  handleInput = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    if (this.state.currentRoom) {
      return <Messenger
        sendMessage={this.sendMessage}
        handleInput={this.handleInput}
        messages={this.state.messages}
        newMessage={this.state.newMessage}
        currentRoom={this.state.currentRoom}
        currentUser={this.state.currentUser}
      />
    }
    return <Login connectToChatkit={this.connectToChatkit} />
  }
}

export default App;
