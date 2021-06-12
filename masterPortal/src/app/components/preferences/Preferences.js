import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import {
    Badge, DropdownItem, DropdownMenu, Tooltip, DropdownToggle, Nav, NavbarBrand, NavbarToggler, Dropdown, NavItem, NavLink
  } from 'reactstrap';
import { addPrefBgColor, addPrefFsize, addPrefContrast, initialPreferences, addRowHeight } from "../../actions";
// import { CirclePicker, GithubPicker } from 'react-color';
import './Preferences.scss';
import UserPreferenceSvg from '../SVGsComponent/userPreferenceSvg'
import RowHeightSvg from '../SVGsComponent/rowHeightSvg'
import ThemeSvg from '../SVGsComponent/themeSvg'
// import ContrastPng from '../../../../public/img/contrast.png'
// import TextSize from '../../../../public/img/text-size.png'

class Preferences extends React.Component {
    constructor(props) {
        super(props);
        //    const themeToggle = useTheme();
        this.textRangehandleClick = this.textRangehandleClick.bind(this);
        // this.bgClickHandler = this.bgClickHandler.bind(this);
        this.contrastChangeHandler = this.contrastChangeHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
        this.cpHandleChange = this.cpHandleChange.bind(this);
        this.changeRowHeight = this.changeRowHeight.bind(this);
        this.onWindowLocationChange = this.onWindowLocationChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            // fSize: 13,
            // cSize: "10",
            // cSizeVal: "1",
            // rowHeightVal: 30,
            dropdownOpen: false,
        }
        this.stylesrender = {};
        this.colors = ["dark", "#fff"];

        //this.colors = ["#ff0000", "#e91e63", "dark", "#fff", "#3f51b5", "#2196f3", "#009688", "#4caf50","#ff5722", "#795548", "#607d8b", "#00bcd4"];
        //this.colors = ["#3e4e59", "#2f353a", "dark", "#fff", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", ];
    }
    onWindowLocationChange() {
        window.location.href = "#";
    }
    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
    onMouseLeaveHandler() {
        const { defaultPreferences, preferences } = this.props;
        let isPreferencesChanged = _.isEqual(defaultPreferences,preferences);
        if(!isPreferencesChanged || this.props.firstTimeUser) {
            // console.log(defaultPreferences,'mouse out handler', preferences, 'isPreferencesChanged', isPreferencesChanged)
            this.props.dispatch(initialPreferences(this.props.userDetails && this.props.userDetails, 'Post', preferences));
        }
        // console.log(defaultPreferences,'---------- mouse out handler ioutsideeeee------', preferences, 'isPreferencesChanged', isPreferencesChanged)
    }
    textRangehandleClick(event) {
        let val = event.target.value;
        // this.setState({
        //     fSize: val
        // })
        this.props.dispatch(addPrefFsize(val));

    }

    contrastChangeHandler(event) {
        location.href = '#'
        let val = event.target.value;
        const updateVal = parseFloat(val) * 10;
        // this.setState({
        //     cSize: updateVal,
        //     cSizeVal: (updateVal / 10).toString(),
        // })
        this.props.dispatch(addPrefContrast(val));
    }
    cpHandleChange(color) { // color
        this.props.dispatch(addPrefBgColor(color));
    }
    changeRowHeight(event) {
        let val = event.target.value;
        // this.setState({
        //     rowHeightVal: val
        // })
        this.props.dispatch(addRowHeight(val));
        this.onWindowLocationChange();
        // let el = document.getElementsByClassName('ReactVirtualized__Table__row');

        // for (let i=0; i<=el.length; i++){
        //     el[i].style.height= event.target.value+'px';
        // }


    }
    handleChangeStart = () => {
        console.log('Change event started')
    };
    render() {
        const {preferences, firstTimeUser} = this.props;
        return (
            <div className="preferences">
                <Dropdown
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}>
            <DropdownToggle className="displayOnlineUsers">
            <UserPreferenceSvg />
             </DropdownToggle>
            <DropdownMenu className="user_online_dropdownmenu" >
              <div className="dropdown-content"
              onMouseLeave={this.onMouseLeaveHandler}>
                        <div className="dropdown-header alignCenter">
                            <strong >Settings</strong>
                        </div>
                        <div className="dropdown-item" >

                            <span>
                                <span className="RowHeightSvg">
                                {/* <img src={TextSize} width="20px" height="20px" /> */}
                                <span className="rowHeightToolTip" >Font Size</span>
                                </span>
                                <input
                                    type="range"
                                    min="12"
                                    max="14"
                                    step="1"
                                    value={preferences && preferences.text_size}
                                    onClick={this.onWindowLocationChange}
                                    onChange={this.textRangehandleClick}
                                    className="e-range"></input>
                                <span className="badge badge-dark"> {preferences && preferences.text_size}</span>
                            </span>
                        </div>

                        <div className="dropdown-item" >
                            <span>
                                <span className="RowHeightSvg">
                                {/* <img src={ContrastPng} width="20px" height="20px" /> */}
                                <span className="rowHeightToolTip" >Contrast</span>
                                </span>
                                <input
                                    type="range"
                                    min="0.8"
                                    max="1"
                                    step="0.1"
                                    className="e-range"
                                    onClick={this.onWindowLocationChange}
                                    value={preferences && preferences.contrast}
                                    onChange={this.contrastChangeHandler}
                                >
                                </input>
                                <span className="badge badge-dark"> {preferences && preferences.contrast}</span>
                            </span>
                        </div>
                        {/* </a> */}
                        {/* <a  className="dropdown-item" href="#"> */}
                        <div className="dropdown-item" >
                            <span>
                                <span className="RowHeightSvg">
                                <RowHeightSvg />
                                <span className="rowHeightToolTip" >Row Height</span>
                                </span>
                                <input
                                    type="range"
                                    min="25"
                                    max="35"
                                    step="1"
                                    className="e-range"
                                    onClick={this.onWindowLocationChange}
                                    value={preferences && preferences.rowHeight}
                                    onChange={this.changeRowHeight}
                                >
                                </input>
                                <span className="badge badge-dark"> {preferences && preferences.rowHeight}</span>
                            </span>
                        </div>
                        <a className="dropdown-item anchor" href="#">
                            <span className="bgColor">
                                
                                <span className="RowHeightSvg">
                                <ThemeSvg />
                                <span className="rowHeightToolTip" >Theme</span>
                                </span>
                                <span className="white colors" onClick={() => this.cpHandleChange("light")}></span>
                                {/* <span className="black colors" onClick={() => this.cpHandleChange("dark")}></span>  */}
                                {/* { this.props.locationPath.indexOf("/imshome/po/") === -1 ?  */}
                                <span className="black colors" onClick={() => this.cpHandleChange("dark")}></span> 
                                {/* : ""} */}

                            </span>
                        </a>
                    </div>
            </DropdownMenu>
          </Dropdown>
          {
              !this.state.dropdownOpen && firstTimeUser ? 
                <div className="userPreference__tooltip" >
                {`Hi ${this.props.userDetails && this.props.userDetails.firstName}, Please set your Preferences here.`}
                </div> 
                :
                ""
            }
               
            </div>

        )
    }
}

const mapStateToProps = state => {
    // console.log(state.homepage.userData.preferences,'---------------------------');
    return {
      defaultPreferences: state.homePage.userData.defaultPreferences,
      preferences: state.homePage.userData.preferences,
      firstTimeUser: state.homePage.userData.firstTimeUser
    };
  };

  export default connect(mapStateToProps)(Preferences);
