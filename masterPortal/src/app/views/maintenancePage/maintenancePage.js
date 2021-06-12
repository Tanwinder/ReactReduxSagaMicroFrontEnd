import React, {Component} from 'react';
import {Container, Row, Col, Button, Input, InputGroupAddon, InputGroup} from 'reactstrap';
import './maintenancePage.scss'

class MaintenancePage extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="clearfix maintenancePage">
                <h1>Sorry, we’re currently down for maintenance.</h1>
                <h2>We apologise for the inconvenience and will be back up shortly.</h2>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default MaintenancePage;