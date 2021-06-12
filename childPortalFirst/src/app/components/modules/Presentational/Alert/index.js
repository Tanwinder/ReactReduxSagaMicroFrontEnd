import React from 'react';
import { Alert, Button } from 'reactstrap';

export default class AlertMessage extends React.Component {

    render() {
        return <Alert color={this.props.color} isOpen={true} style={{ opacity: "10" }}>

            <p style={{ fontSize: "12px" }}>
                <label style={{ width: "90%", fontWeight: "normal" }}>{this.props.children}</label>
                {(this.props.toggle && (this.props.color === "danger" || this.props.color === "warning")) ? <Button size="sm" color={this.props.color} onClick={this.props.toggle}>OK</Button> : null}
            </p>
        </Alert>
    }
}