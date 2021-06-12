import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
// import UnAuthorizedAccess from '../../components/UnAuthorizedAccess/UnAuthorizedAccess'
import { App2Url } from '../../app.config';
import MaintenancePage from '../../views/maintenancePage/maintenancePage'

class App2 extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { userDetailsObj, appErrors } = this.props;
        const env = process.env.NODE_ENV;
        const userGroup = env == 'production' ? "App2" : "App2";
        const app_url = App2Url();
        const app_errors = !!appErrors && appErrors.length > 0 && appErrors.some(elm => elm.indexOf(app_url) !== -1);
        return (
            <div>
                {
                    // !!userDetailsObj && !!userDetailsObj.userGroup && userDetailsObj.userGroup.indexOf(userGroup) > -1 ?
                    // !app_errors ?
                    true?
                    <App2-app userDetailsObj={userDetailsObj.userGroup}></App2-app>
                    :
                    <MaintenancePage />
                }
            </div>
        )
    }
}

App2.propTypes = {

}

export default App2