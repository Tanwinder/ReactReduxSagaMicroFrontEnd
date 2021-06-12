import React, { Component } from 'react';
import 'babel-polyfill';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { Alert, Container } from 'reactstrap';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import Footer from './components/Footer/Footer';
import HomePage from './containers/Home/Home';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { connect } from 'react-redux';
import { addBrowsingHistory, addUserDetails } from "./actions";
import 'react-dates/lib/css/_datepicker.css';

import '../../scss/oldBootstrap/portaltheme/css/bootstrap.min.css';
import '../../scss/oldBootstrap/portaltheme/css/bootstrap-theme.min.css';
import '../../scss/oldBootstrap/oldbundle.scss'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

import { App1Url, App2Url } from '../app/app.config';
import Page404 from './views/Pages/Page404/Page404';
import Dexie from 'dexie';

import { ThemeProvider } from 'theming';
import { handleCases } from './../themes/ImsThemes';
import App1 from './containers/App1';
import App2 from './containers/App2';

import routes from './routes';

let modalBody = document.querySelector('body');
let theme;
class App extends Component {
  constructor(props) {
    super(props);
    this.handleNavLinkClick = this.handleNavLinkClick.bind(this);
    this.getTheme = this.getTheme.bind(this);
    this.state = {
      playing: true,
      userDetailsObj: null,
      appErrors: [],
      themes: '',
    };
  }
  getTheme(preferences) {
    theme = handleCases(preferences);
    modalBody.getAttributeNode("class").value ='app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden '+theme;
    return theme;
  }
  componentWillMount() { 
    const env = process.env.NODE_ENV;
    const self = this;    
    axios.get('/userDetails')
      .then((response) => {            
        if(!!response.data) {
          let appUrl = [];
          self.props.dispatch(addUserDetails(response.data));
          this.setState({
            userDetailsObj: response.data
          },
            () => {this.saveUserHistory();}
          )
          
          if(env === 'production') {
            if(!!response.data.userGroup && response.data.userGroup.constructor === Array) {
              response.data.userGroup.forEach( ac => {                
                switch(ac) {
                  case 'App1':
                  appUrl.push(App1Url());
                  break;
                  case 'App2':
                  appUrl.push(App2Url());
                  break;
                }
              });
            } 
          } else {
            if(!!response.data.userGroup && response.data.userGroup.constructor === Array) {
              response.data.userGroup.forEach( ac => {                
                switch(ac) {
                  case 'App1':
                  appUrl.push(App1Url());
                  break;
                  case 'App2':
                  appUrl.push(App2Url());
                  break;
                }
              });
            } 
          }
          
          for( let i= 0; i < appUrl.length; i++) {
            // this.loadScssFile(`${appUrl[i]}dist/index.font.css`, "css");
            this.loadScssFile(`${appUrl[i]}dist/index.styles.css`, "css");
          }
          for( let i= 0; i < appUrl.length; i++) {
            this.loadJsFile(`${appUrl[i]}dist/index.bundle.js`, "js");
          }
        }              
      })
      .catch((err) => {
        console.log(err)
      })
  }

  loadScssFile(filename, filetype){
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
        document.getElementsByTagName("head")[0].appendChild(fileref)
  }

  loadJsFile(filename, filetype){
    let newStateErrorApps = this.state.appErrors;
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("async","");
        fileref.setAttribute("src", filename);
        fileref.onerror = function() {
          newStateErrorApps.push(this.src);
        }
        document.getElementsByTagName("body")[0].appendChild(fileref);
        this.setState({
          appErrors: newStateErrorApps
        })
  }

  handleVideoEnd = () => {
    this.setState({playing: false});
  }

  onErrorOccur = (error) => {
      this.setState({playing: false});
  }

  saveUserHistory(){
    const {userDetailsObj} = this.state;
    if (!!userDetailsObj) {
      const params = {
          "tkid": userDetailsObj.userName,
          "fname": userDetailsObj.firstName,
          "lname": userDetailsObj.lastName,
          "app_name": routes[window.location.pathname],
          "url": window.location.href,
          "accessed_at": Date.now()
      };
      axios.post(`serviceurl`, params)
      .then()
      .catch()
    }
  }

  componentDidMount() {
    setTimeout(() => {this.setState({playing:false})}, 2000);	
    // this.unlisten = this.props.history.listen((location, action) => {
    //   this.saveUserHistory();
    // });
  //   Dexie.exists('ImsDataBase').then(function (exists) {
  //     // if (!!exists) {
  //       Dexie.delete('ImsDataBase');
  //       axios.get('/authenticateUser')
  //         .then( ac => {
  //           var header = { appid:"FUSE_API",headers: ac.data};
  //           var db = new Dexie("ImsDataBase");

  //           db.version(1).stores({
  //               fuseui: `
  //               ++id,
  //               appid,
  //               headers`,
  //             });
  //           db.fuseui.add(header).then( ac => {
  //             console.log('updated successfully')
  //           });
  //         })
  //         .catch( err => {
  //           console.log('e4545454', err)
  //         })  
  // });
    
  }

  componentWillUnMount() {
    this.unlisten();
  }

  handleNavLinkClick(item){
    this.props.dispatch(addBrowsingHistory(item));
  }

  render() {
    const { userDetailsObj, appErrors } = this.state;
    const { preferences, newNotificationMsg } = this.props;
    // let prefValues = store.getState().homePage.userData.preferences;
    let prefTheme = this.getTheme(preferences);
    let rowHeightVal = preferences.rowHeight;
    let self = this;
    if(newNotificationMsg) {
      window.setTimeout(function(){
        self.props.dispatch({
          type: "IMS_NEW_SOCKET_NOTIFICATION",
          newPo: null
        })
       }, 5000)
    }
      return (
        this.state.playing ?
        <div>Loading...</div>
            :
            // <Provider store={store}>
          <div className={`app ${(prefTheme)}`}>
          {/* <CheckIdleTime /> */}
          <ThemeProvider theme={prefTheme}><Header userDetails={userDetailsObj} prefTheme={prefTheme} locationPath={this.props.location.pathname} /></ThemeProvider>
          <div className="app-body" style={{backgroundColor: (prefTheme.includes("gray") ? '#2e2e2e': '')}}>
            <ThemeProvider theme={prefTheme}><Sidebar userDetails={userDetailsObj} handleNavLinkClick={this.handleNavLinkClick} {...this.props} /></ThemeProvider>
            <main className={`main ${(prefTheme)} rowHeight-${rowHeightVal}`} >
              <Breadcrumb />
              <Container fluid>
                {newNotificationMsg ? 
                  <div className="ims_notification_po">
                  <Alert color={newNotificationMsg.indexOf("success") !== -1 ? 'success' : 'danger'}>
                     <div className='ims_notification_msg'>
                     <span>{newNotificationMsg}</span>
                     <span 
                     className='ims_notification_msg_close'
                     onClick={() => {
                      this.props.dispatch({
                        type: "IMS_NEW_SOCKET_NOTIFICATION",
                        newPo: null
                      })
                     }}>X</span>
                     </div>
                  </Alert>
                  </div>
                  :
                  ""
                  }
               
                <Switch>
                  <Route path="/app1" name="app1" render={ props => <App1 userDetailsObj={userDetailsObj} appErrors={appErrors} handleNavLinkClick={this.handleNavLinkClick} />}/>
                  <Route path="/app2" name="app2" render={ props => <App2 userDetailsObj={userDetailsObj} appErrors={appErrors} handleNavLinkClick={this.handleNavLinkClick} />}/>
                  <Route path="/" name="Home" render={ props => <HomePage userDetailsObj={userDetailsObj} appErrors={appErrors}/>} />
                  <Route path="/pagenotfound" component={Page404} />
                  <Redirect to="/pagenotfound" />
                </Switch>
              </Container>
            </main>
          </div>
          <ThemeProvider theme={prefTheme}><Footer /></ThemeProvider>
        </div>
        // </Provider>
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

export default withRouter(connect(mapStateToProps)(App));
