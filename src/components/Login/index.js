// @flow
import React from 'react'
import './login_style.css'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

class Login extends React.Component<Props, State> {
  constructor (props: Props) {
    super (props)
    this.state = {
      userId: null,
      waiting: false,
    }
  }

  login () {
    const {
      userId,
      waiting,
    } = this.state

    if (waiting) return;
    this.setState({ waiting: true });
    this.props.connectToChatkit(userId);
  }

  render() {
    return (<div id="identity">
      <form>
      <h1>Chatkit Sample App</h1>
      <div className="login-group">
        <label htmlFor="userid">Username</label>
        <input type="text" id="userid" onChange={e => this.setState({ userId: e.target.value })}/>
      </div>
      <button type="button" value="Submit" onClick={() => this.login()}>
        {this.state.waiting ? <FontAwesomeIcon icon={faSpinner} spin/> : null}
        <span>Login</span>
      </button>
    </form>
  </div>)
  }
}

export default Login;
