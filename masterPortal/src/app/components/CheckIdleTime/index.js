import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import IdleTimer from 'react-idle-timer'
import moment from 'moment';
import axios from 'axios';
import LogOutModal from '../LogOutModal'
 
class CheckIdleTime extends Component {
  constructor(props){
    super(props)

    this.state = {
        timeout:1000 * 5 * 1,
        showModal: false,
        userLoggedIn: false,
        isTimedOut: false
    }

    this.idleTimer = null
    this.onAction = this._onAction.bind(this)
    this.onActive = this._onActive.bind(this)
    this.onIdle = this._onIdle.bind(this)
}

handleClose = () => {
  this.setState({showModal: false})
}

handleLogout = () => {
  this.setState({showModal: false})
  this.props.history.push('/')
}

_onAction(e) {
  console.log('user did something', e)
  this.setState({isTimedOut: false})
}

_onActive(e) {
  console.log('user is active', e)
  this.setState({isTimedOut: false})
}

_onIdle(e) {
  console.log('user is idle', e)
  const isTimedOut = this.state.isTimedOut
  if (isTimedOut) {
      this.props.history.push('/')
  } else {
    this.setState({showModal: true})
    this.idleTimer.reset();
    this.setState({isTimedOut: true})
  }
  
}
 
  render() {
    return (
      <div>
        <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={this.state.timeout} />
        {/* your app here */}
        <LogOutModal 
        showModal={this.state.showModal}
        handleClose={this.handleClose}
        handleLogout={this.handleLogout}
        />
      </div>
    )
  }
 
  // _onAction(e) {
  //   console.log('user did something', e, 'this.idleTimer.getRemainingTime()', this.idleTimer.getRemainingTime(), 'this.idleTimer.getLastActiveTime()', this.idleTimer.getLastActiveTime())
  //   // let gh = moment(new Date(this.idleTimer.getLastActiveTime())).format('LLLL'); 
  //   // this.props.userLogOut(gh,"active")
  //   // this.idleTimer.reset();
  // }
 
  // _onActive(e) {
  //   // console.log('user is active', e,'time remaining', this.idleTimer.getRemainingTime())
  // }
 
  // _onIdle(e) {
  //   // let gh = moment(new Date(this.idleTimer.getLastActiveTime())).format('LLLL'); 
  //   // // this.props.userLogOut(gh, "notActive")
  //   console.log('user is idle', e, 'this.idleTimer.getRemainingTime()', this.idleTimer.getRemainingTime(), 'last active', this.idleTimer.getLastActiveTime());
  //   // axios.get('/logout')
  //   // .then()
  //   // .catch();
  //   // setTimeout(() => {window.location.href = window.location.origin}, 1000);
  // }
}

export default withRouter(CheckIdleTime);
