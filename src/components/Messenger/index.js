import React, { Component } from 'react';

class Messenger extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

   render() {
     const { messages, newMessage, currentRoom, currentUser } = this.props;
     const ChatSession = messages.map(message => {
       return (
         <li className="message" key={message.id}>
           <div>
             <span className="user-id">{message.senderId}</span>
             <span>{message.text}</span>
           </div>
         </li>
       );
     });

     return (
    <div className="Messenger">
       <aside className="sidebar left-sidebar">
          {currentUser ? (
            <div className="user-profile">
              <span className="user-id">{`@${currentUser.id}`}</span>
            </div>
          ) : null}
       </aside>
        <section className="chat-screen">
       <header className="chat-header">
         {currentRoom ? <h3>{currentRoom.name}</h3> : null}
       </header>
          <ul className="chat-messages">{ChatSession}</ul>
          <footer className="chat-footer">
            <form onSubmit={this.props.sendMessage} className="message-form">
              <input
                type="text"
                name="newMessage"
                className="message-input"
                placeholder="Type your message and hit ENTER to send"
       value={newMessage}
               onChange={this.props.handleInput}
              />
            </form>
          </footer>
        </section>
      </div>
     )
  }
}

export default Messenger;
