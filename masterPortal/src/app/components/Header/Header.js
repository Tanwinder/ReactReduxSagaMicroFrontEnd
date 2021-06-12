import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cn from 'classnames';
import {
  Badge, DropdownItem, DropdownMenu,Tooltip, DropdownToggle, Nav, NavbarBrand, NavbarToggler, Dropdown, NavItem, NavLink
} from 'reactstrap';
import './Header.scss';
import BadgeIcon from '../BadgeIcon'

import socketIOClient from "socket.io-client";
import { userInfo } from 'os';

import Preferences from '../preferences/Preferences';
import { withTheme } from 'theming';
import { handleCases } from './../../../themes/ImsThemes';
import { connect } from 'react-redux';
import { themeFinal } from "../../actions";
import Switch from '../Switch'
import NotificationsSvg from '../SVGsComponent/NotificationsSvg'
class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleLogOut = this.toggleLogOut.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownLogOutOpen: false,
      // userDetails: null,
      tooltipOpen: false,
      onlineUsers: [],
      notificationDropdownOpen: false,
      notificationData: [],
      notificationSeen: false
    };
  }

  // SelectOrderStrategy = (val) => {
  //   alert(!!val && val.os_nbr)
  // }

  componentWillMount() {
    const OktaEnable = ["stage1","stress1", "production"].includes(process.env.NODE_ENV);
    console.log(OktaEnable,'process.env.NODE_ENV ', process.env.NODE_ENV);
    if(!!OktaEnable){
      const socket = socketIOClient('/imsnamespace');
      var members = [];
      const self = this;
      const { userDetails } = this.props;
      const sendUserDetails = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        userName: userDetails.userName
      }
      socket.on('POConfirmation', function (data) {
        console.log("datatata", data)
        let poData = JSON.parse(data);
        let tkVal = userDetails && userDetails.userName;
        console.log("poData", poData, '-----tkVal -----', tkVal)
        if(poData && poData.tkid === tkVal) {
          let addNotification = self.state.notificationData;
          self.props.dispatch({
            type: "IMS_NEW_SOCKET_NOTIFICATION",
            newPo: !!poData.error_msg ? poData.error_msg : poData.status_msg
          })
          addNotification.unshift(poData);
          self.setState({
            notificationData: addNotification,
            notificationSeen: false
          })
        }
      });
      

      socket.on('connect', function () {
        var index = socket.io.engine.upgrade ? 1 : 0;
        
        var tt = {};
        tt.STATE=1;
        tt.message=socket.id;
        tt.userDtl=sendUserDetails;
        members.push(tt);
        console.log('get connect members ', members);
        socket.emit('message-all', JSON.stringify(tt) );
      });
      
      socket.on('message-all', function (data) {
        var testdata = JSON.parse(data)
        // console.log("header message alll parsedata ", testdata, 'members in message all', members);
        if (testdata.STATE === 1) {
          testdata.STATE=0
          testdata.message=socket.id;
          testdata.userDtl=sendUserDetails;
          socket.emit('message-all', JSON.stringify(testdata) );
        }
        if (testdata.STATE === 0 && !members.some(ac => ac.message === testdata.message)){
          testdata.STATE =1; 
          members.push(testdata);
        }
        if (testdata.STATE === 2 && members.some(ac => ac.message === testdata.message)) {
          for( var i = 0; i < members.length; i++){ 
            if ( members[i].message === testdata.message) {
              members.splice(i, 1); 
            }
          }
        }
        
        let UserInfo = members.map(ac => {
          // let userData = ac.split("-");
          return {
            userId: ac.userDtl && ac.userDtl.userName,
            firstName: ac.userDtl && ac.userDtl.firstName,
            lastName: ac.userDtl && ac.userDtl.lastName
          }
        });
          
        UserInfo = UserInfo.reduce( (final, ac, i, arr) => {
          if(!!ac.lastName) {
            let duplicateVal = final.some( kl => kl.userId === ac.userId)
            if( duplicateVal ){
              final = final.map(jk => jk.userId === ac.userId ? {...jk, count: jk.count+1} : jk);
            } else {
              ac = {...ac, count: 1};
              final.push(ac);
            }
          }
          return final;
        } , [])
        self.setState({
          onlineUsers: UserInfo
        })
      });
    }  
  }
  
  logOut(e) {
    axios.get('/logout')
    .then()
    .catch();
    setTimeout(() => {window.location.href = window.location.origin}, 1000);    
  }

  toggleLogOut() {
    this.setState({dropdownLogOutOpen: !this.state.dropdownLogOutOpen});
  }

  toggleNotifications = () => {
    this.setState({
      dropdownOpen: false,
      notificationSeen: true,
      notificationDropdownOpen: !this.state.notificationDropdownOpen
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      notificationDropdownOpen: false
    });
  }

  toggleToolTip = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    let { preferences, defaultPreferences, prefTheme, newNotificationMsg } = this.props;
    let { notificationData } = this.state;
    let bellClasses = cn({
      "bell-top-anim": !!newNotificationMsg
    })
    let bellIconClasses = cn({
      "notification_circle": true,
      "notificationSeen": this.state.notificationSeen,
      "new-notification": !!newNotificationMsg
    })
    return (
      <header className={`app-header navbar ${prefTheme}`}>
        <NavbarToggler className="d-lg-none" style={{fontSize: '24px'}} onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
        <NavbarToggler className="d-md-down-none" style={{fontSize: '24px'}} onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
        <NavbarBrand style={{borderBottom: "none"}} href="#"></NavbarBrand>
        {/* <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="#"><i className="icon-heart"></i> Favorites </NavLink>
          </NavItem>
        </Nav> */}
        
        <Nav className="ml-auto" navbar>
          <div style={{position: 'relative', marginRight: '35px'}}>
            <Switch userDetails={this.props.userDetails}/></div>
          
          <Dropdown 
            isOpen={this.state.notificationDropdownOpen} 
            toggle={this.toggleNotifications}>
            <DropdownToggle className="displayOnlineUsers">
            <div 
            style={{
              marginLeft: "13px",
              marginRight: "8px",
              paddingTop: "3px"
            }}
            >
              {
                notificationData && notificationData.length && notificationData.length > 0 ?
                <span className={bellIconClasses}>{notificationData.length}</span>
                :
                ""
              }
              <div className={bellClasses}>
              <NotificationsSvg />
              </div>
              
            </div>
            {/* <BadgeIcon content={!!this.state.onlineUsers && this.state.onlineUsers.length > 0 ? this.state.onlineUsers.length : 1} /> */}
            </DropdownToggle>
            <DropdownMenu className="user_online_dropdownmenu" >
              <DropdownItem header tag="div" className="text-center"><strong>You have {notificationData && notificationData.length} notifications</strong></DropdownItem>
              {/* <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem> */}
              <div className="online_user_outer">
              {
                notificationData && notificationData.length > 0 && notificationData.map(ac => {
                  return(<DropdownItem key={ac.po_nbr}>
                    <div 
                      style={{color: !!ac.error_msg ? 'red': 'green'}} 
                      // onClick={() => this.SelectOrderStrategy(ac)}
                    > 
                      <Link to={`/imshome/po/order/reviewsubmit/${ac.dept_nbr}/${ac.os_nbr}`} >{!!ac.error_msg ? ac.error_msg : ac.status_msg}</Link>
                    </div>
                  </DropdownItem>)
                })
              }
              </div>
            </DropdownMenu>
          </Dropdown>
          <Dropdown 
            isOpen={this.state.dropdownOpen} 
            toggle={this.toggle}>
            <DropdownToggle className="displayOnlineUsers"> 
            <BadgeIcon content={!!this.state.onlineUsers && this.state.onlineUsers.length > 0 ? this.state.onlineUsers.length : 1} />
            </DropdownToggle>
            <DropdownMenu className="user_online_dropdownmenu" >
              <DropdownItem header tag="div" className="text-center"><strong>Online Users</strong></DropdownItem>
              {/* <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem> */}
              <div className="online_user_outer">
              {
                this.state.onlineUsers.length > 0 && this.state.onlineUsers.map(ac => {
                  return(<DropdownItem key={ac.userId}>
                    <i className="fa fa-user fa_user_size">
                      <div className="user_count">{ac.count}</div>
                    </i> 
                    {`${ac.firstName} ${ac.lastName}` }
                    <span className="users_dot_circle">
                    </span>
                  </DropdownItem>)
                })
              }
              </div>
            </DropdownMenu>
          </Dropdown>         
          
          <Dropdown isOpen={this.state.dropdownLogOutOpen} toggle={this.toggleLogOut}>
            <DropdownToggle className="displayOnlineUsers"> 
              <span className="userNameContainer"><i id="TooltipExample" className="fa fa-user-circle"></i> Hello {this.props.userDetails != null ? this.props.userDetails.firstName : ''}</span>
            </DropdownToggle>
            <DropdownMenu className="user_online_dropdownmenu" >
              <DropdownItem header tag="div" className="text-center" onClick={this.logOut}><strong style={{cursor:'pointer'}} onClick={this.logOut}>Log Out</strong></DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Preferences userDetails={this.props.userDetails} locationPath={this.props.locationPath} defaultPreferences={defaultPreferences} preferences={preferences}></Preferences>    
        </Nav>
      </header>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state.homepage.userData.preferences,'---------------------------');
  return {
    defaultPreferences: state.homePage.userData.defaultPreferences,
    preferences: state.homePage.userData.preferences,
    newNotificationMsg: state.poNotifications.newNotificationMsg,
  };
};
// Header.propTypes = {
//   theme: PropTypes.string
// };
export default withTheme(connect(mapStateToProps)(Header));
