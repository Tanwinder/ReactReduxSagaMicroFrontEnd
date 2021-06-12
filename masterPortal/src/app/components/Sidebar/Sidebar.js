import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Nav, NavItem, NavLink as RsNavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import isExternal from 'is-url-external';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip'
import nav from './_nav';
import SidebarFooter from './../SidebarFooter';
import SidebarForm from './../SidebarForm';
import SidebarHeader from './../SidebarHeader';
import SidebarMinimizer from './../SidebarMinimizer';
import * as AppConfig from './../../app.config';
import axios from "axios";
import * as appNames from './../../IMSAppNames';
import ReactSVG from 'react-svg';
import UnAuthorizedAccess from "../UnAuthorizedAccess/UnAuthorizedAccess"
import './Sidebar.scss';
import { withTheme } from 'theming';
import { connect } from 'react-redux';
import { handleCases } from './../../../themes/ImsThemes';
// import PropTypes from 'prop-types';

class Sidebar extends Component {


  constructor(props) {
    super(props)
    // this.state={userDetails: null}
    this.state = {
      pendingURL: null,
      showNavAlert: false
    };
    this.toggle = this.toggle.bind(this);
    this.navPage = this.navPage.bind(this);
  }

  // componentWillMount() {
  // axios.get('/userDetails')
  //   .then((response) => {
  //     let userDtls = response.data;
  //     this.setState({ userDetails: userDtls });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // };

  toggle() {
    this.setState({ showNavAlert: false });
  }

  navPage() {
    this.setState({ pendingURL: null, showNavAlert: false });
    this.props.history.push(this.state.pendingURL);
  }

  handleNavClick(e, pendingURL, props) {
    const targetNode = document.querySelectorAll('.StoreCap_saveBtns_hide');
    const linkDisabled = targetNode.length > 0 ? targetNode.length != 6 : false;
    if (linkDisabled) {
      if (props.location.pathname != pendingURL) {
        this.setState({ pendingURL, showNavAlert: true });
      }
      e.preventDefault();
    }
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName, props) {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  // todo Sidebar nav secondLevel
  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  getUserAccessType(userDtlsObj, appName) {
    let userAccess = [];

    if (userDtlsObj != null) {
      if (userDtlsObj.userGroup != null && userDtlsObj.userGroup.constructor === Array) {
        for (let userGrp of userDtlsObj.userGroup) {
          let access = AppConfig.getUserAccess(userGrp, appName);
          if (access != null) {
            userAccess.push(access.userType);
          }
        }
      } else {
        let access = AppConfig.getUserAccess(userDtlsObj.userGroup, appName);
        if (access != null) {
          userAccess.push(access.userType);
        }
      }
    }
    return userAccess;
  }

  render() {

    const props = this.props;
    const activeRoute = this.activeRoute;

    const handleClick = this.handleClick;
    let userDtlsObj = this.props.userDetails;
    let userAccess = [];
    let App1Access = this.getUserAccessType(userDtlsObj, appNames.APP1);
    let App2Access = this.getUserAccessType(userDtlsObj, appNames.APP2);

    let { theme, preferences } = this.props;
     theme = handleCases(preferences)
    
    // badge addon to NavItem
    const badge = (badge) => {
      if (badge) {
        const classes = classNames(badge.class);
        return (<Badge className={classes} color={badge.variant}>{badge.text}</Badge>)
      }
    };

    // simple wrapper for nav-title item
    const wrapper = item => { return (item.wrapper && item.wrapper.element ? (React.createElement(item.wrapper.element, item.wrapper.attributes, item.name)) : item.name) };

    // nav list section title
    const title = (title, key) => {
      const classes = classNames("nav-title", title.class);
      return (<li key={key} className={classes}>{wrapper(title)} </li>);
    };

    // nav list divider
    const divider = (divider, key) => (<li key={key} className="divider"></li>);

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = classNames(item.class);
      const variant = classNames("nav-link", item.variant ? `nav-link-${item.variant}` : "");

      switch (item.parent) {
        case (appNames.APP1):
          userAccess = App1Access;
          break;
        case (appNames.APP2):
          userAccess = App2Access
          break;
      }
      return (
        <div key={key}>
          {/* { userAccess.some(elem => item.accessLevel.indexOf(elem) > npm rebuild node-sass --force ) ? */}
          <NavItem key={key} className={classes}>
            {isExternal(item.url) ?
              <RsNavLink href={item.url} className={variant}>
                {!!item.svg ?
                  <ReactSVG svgStyle={{ width: 17, height: 'auto' }} src={item.svg} />
                  : <i className={item.icon}></i>
                }
                <span style={{color: (theme.includes("gray") ? "#c8ced3" : "")}}>{item.name}{badge(item.badge)}</span>
              </RsNavLink>
              :
              <NavLink data-for={!!item && item.name} data-tip to={item.url} onClick={(e) => this.handleNavClick(e, item.url, props)} className={variant} activeClassName="active">
                {
                  //   !!item.img ? 
                  // <img className="img-icons" src={item.img} style={{marginRight: '5px'}}/>
                  !!item.svg ?
                    <ReactSVG svgStyle={{ width: 20, height: 'auto' }} src={item.svg} />
                    : <i className={item.icon}></i>
                }
                <span style={{color: (theme.includes("gray") ? "#c8ced3" : "")}}>{item.name}{badge(item.badge)}</span>
                {
                  !!item && !!item.top && (!userAccess || userAccess.indexOf("ADMIN") === -1) ?
                    // <UnAuthorizedAccess
                    //   top={item.top}
                    //   left="260px"
                    //   errorMsg="TKID is not assigned to a user group. Please contact system administrator to add your TK to a group." />
                    <ReactTooltip id={!!item && item.name} place='right' type='error' effect='solid'>
                        <span>TKID is not assigned to a user group. Please contact system administrator to add your TK to a group.</span>
                      </ReactTooltip>
                    : <div></div>
                }
              </NavLink>
            }
          </NavItem>
          {/* : '' } */}
        </div>
      )
    };

    // nav dropdown
    const Dropdown = (item, key) => {
      return (
        <li key={key} className={activeRoute(item.url, props)}>
          <a className="nav-link nav-dropdown-toggle dps-nav-sub-title" href="#" onClick={handleClick.bind(this)}>
            {!!item.svg ?
              <ReactSVG src={item.svg} />
              : <i className={item.icon}></i>
            }
            <span>{item.name}</span></a>
          <ul className="nav-dropdown-items">
            {navList(item.children)}
          </ul>
        </li>)
    };

    // nav link
    const navLink = (item, idx) =>
      item.title ? title(item, idx) :
        item.divider ? divider(item, idx) :
          item.children ? Dropdown(item, idx)
            : navItem(item, idx);

    // nav list
    const navList = (items) => {
      return items.map((item, index) => navLink(item, index));
    };

    // sidebar-nav root
    return (
      <div className="sidebar">
        <Modal id="sidebar-nav-alert" isOpen={this.state.showNavAlert} toggle={this.toggle} backdrop={"static"}>
          <ModalHeader toggle={this.toggle}>{'Are you sure you want to leave without saving?'}</ModalHeader>
          <ModalBody>
            {'If you navigate away from this page without first saving, the changes will be lost.'}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.navPage}>Ok</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <SidebarHeader />
        <SidebarForm />
        <nav className={`sidebar-nav ${theme}`}>
          <Nav>
            {navList(nav.items)}
          </Nav>
        </nav>
        <SidebarFooter className={theme} />
        <SidebarMinimizer className={theme} />
      </div>
    )
  }
}
const mapStateToProps = state => {
  // console.log(state.homepage.userData.preferences,'---------------------------');
  return {
    preferences: state.homePage.userData.preferences
  };
};
//  Sidebar.propTypes = {
//   theme: PropTypes.string
// };
export default withTheme(connect(mapStateToProps)(Sidebar));
