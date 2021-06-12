import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';
import './UnAuthorizedAccess.scss'

const UnAuthorizedAccess = ({errorMsg, top, left}) => (
//     <Row className='error-page'>                                                                            
//         <p className="error-msg">          
//              {errorMsg}                
//         </p>
//    </Row>
    <div className="unAuthToolTip" style={{top: top, left: left}}>
        {errorMsg}
    </div>
);

UnAuthorizedAccess.propTypes = { errorMsg: PropTypes.string };

export default UnAuthorizedAccess;