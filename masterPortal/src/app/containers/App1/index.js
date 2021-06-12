import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
// import UnAuthorizedAccess from '../../components/UnAuthorizedAccess/UnAuthorizedAccess'
import { App1Url } from '../../app.config';
import MaintenancePage from '../../views/maintenancePage/maintenancePage'

class App1 extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { userDetailsObj, appErrors } = this.props;
        const env = process.env.NODE_ENV;
        const userGroup = env == 'production' ? "App1" : "App2";
        const app_url = App1Url();
        const app_errors = !!appErrors && appErrors.length > 0 && appErrors.some(elm => elm.indexOf(app_url) !== -1);
        return (
            <div>
                {
                    // !!userDetailsObj && !!userDetailsObj.userGroup && userDetailsObj.userGroup.indexOf(userGroup) > -1 ?
                    // !app_errors ?
                    true?
                    <app1-app userDetailsObj={userDetailsObj.userGroup}></app1-app>
                    :
                    <MaintenancePage />
                }
            </div>
        )
    }
}

App1.propTypes = {

}

export default App1