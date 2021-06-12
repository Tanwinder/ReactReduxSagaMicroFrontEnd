import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import './Switch.scss'
import _ from 'lodash';
import { addPrefBgColor, initialPreferences } from "../../actions";
import FullMoon from '../SVGsComponent/FullMoon'
import Sunny from '../SVGsComponent/Sunny'

class Switch extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     isChecked: null
        // }

    }
    
    // componentWillMount () {
	// 	this.setState( { isChecked: !!this.props.isChecked } );
	// }
    _handleChange = (color) => {
        this.props.dispatch(addPrefBgColor(color));
        // this.setState( { isChecked: !this.state.isChecked } );
        
    }

    saveUserPreferences = () => {
        const { defaultPreferences, preferences } = this.props;
        let isPreferencesChanged = _.isEqual(defaultPreferences,preferences);
        if(!isPreferencesChanged || this.props.firstTimeUser) {
            // console.log(defaultPreferences,'mouse out handler', preferences, 'isPreferencesChanged', isPreferencesChanged)
            this.props.dispatch(initialPreferences(this.props.userDetails && this.props.userDetails, 'Post', preferences));
        }
        // console.log(defaultPreferences,'---------- mouse out handler ioutsideeeee------', preferences, 'isPreferencesChanged', isPreferencesChanged)
    }
    render() {
        const {preferences} = this.props;
        return (
            <div className="switch-container"
             onMouseLeave={this.saveUserPreferences} >
                <label>
                    <input 
                        ref="switch" 
                        checked={ preferences.background_color !== "dark" ? true : false } 
                        onChange={ () => this._handleChange(preferences.background_color !== "dark" ? "dark" : "light") } 
                        className="switch" 
                        type="checkbox" 
                        style={{cursor: 'pointer'}}
                    />
                    <div>
                        <div>{ preferences.background_color !== "dark" ? <Sunny /> : <FullMoon /> }</div>
                        
                    </div>
                </label>
            </div>
        )
    }
}

Switch.propTypes = {

}

const mapStateToProps = state => {
    // console.log(state.homepage.userData.preferences,'---------------------------');
    return {
      preferences: state.homePage.userData.preferences,
      defaultPreferences: state.homePage.userData.defaultPreferences,
      firstTimeUser: state.homePage.userData.firstTimeUser
    };
  };

export default connect(mapStateToProps)(Switch);

