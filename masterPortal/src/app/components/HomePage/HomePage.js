import React, { Component } from 'react';
import { initializeHomePage } from "../../actions/index";
import { connect } from 'react-redux';
import UserBrowsingHistoryCards from './UserBrowsingHistoryCards';
import './HomePage.scss';
// import Dashboard from './Dashboard/Dashboard';

class HomePage extends Component {
    componentDidMount() {
        this.props.dispatch(initializeHomePage());
    }

    render() {
        let { userDetailsObj, appErrors, userData } = this.props;        
        let {browsingHistory, browsingHistoryCards} = userData;
        return(
            <div style={{margin:'0 -30px'}}>
                <div className="home-page-content">
                    <div className="home-header"><i className="fa fa-home" style={{fontSize:'16px'}}></i></div>
                    {/* {process.env.NODE_ENV === 'ci' && <Dashboard />} */}
                    {false && <img src="../../../../public/img/coming-soon.jpg" className="comingSoonImgHome" />}
                </div>
                {false && (browsingHistory && browsingHistory.length !== 0) && <UserBrowsingHistoryCards userDetailsObj={userDetailsObj} appErrors={appErrors} />}
            </div>
        )
    }
}

const mapStateToProps = store => ({
    userData: store.homePage.userData    
})

export default connect(mapStateToProps)(HomePage);

