import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'reactstrap'
import CheckboxFilter from '.././common/CheckBoxFilter'
import TextAreaReact from '../common/TextAreaReact';


class AddNewMessage extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { onChangeMessageValue, SetMessageButton, AppNames, onFilterChange, selectedAppName, messageValue } = this.props;
        return (
            <React.Fragment>
                <Row>
                    <Col sm="3">
                        <CheckboxFilter
                            options={AppNames}
                            onChange={(value) => onFilterChange( value)}
                            placeholder="Select App Name"
                            value={selectedAppName}
                            classname="fuse-buyer"
                            label=""
                            labelKey="displayName"
                            valueKey="displayName"
                            disabled={false}
                            multi={true} />
                    </Col>
                    <Col sm="6">
                        <TextAreaReact
                            id={'text'}
                            placeholder={"write a message..."}
                            value={messageValue}
                            onChangeMessageValue={onChangeMessageValue} />
                    </Col>
                    <Col sm="3">
                        <Button 
                            size="lg" 
                            color='info'
                            onClick={SetMessageButton}
                            disabled={!!messageValue ? false : true}
                            // style={{marginRight:'10px'}}
                        >
                            <i className="fas fa-envelope" aria-hidden="true"></i>{' Set Message'}
                        </Button>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

AddNewMessage.propTypes = {

}

export default AddNewMessage