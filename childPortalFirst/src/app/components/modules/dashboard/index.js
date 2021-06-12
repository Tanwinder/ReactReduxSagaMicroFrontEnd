import React from 'react';
import { Row, Col, Card } from 'reactstrap';
import { connect } from 'react-redux';
import '../../../scss/styles.scss';
import './poDashboard.scss'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        DepartmentSalesExpand: false,
    }
  }

    render() {
        return <React.Fragment>
            <div className="rocAdmin">
                <Card>
                    <Row>
                        <Col xs="12">
                            <div style={{margin: "300px"}}>helloo   appp1</div>
                            {/* <DepartmentSales 
                                svg={`${portal_url_opc}/public/svg/like_dept.svg`} 
                                header="Like Department Sales Setup"
                                collapse={DepartmentSalesExpand}                                
                                onExpandCard={this.onExpandDepartmentSales}
                                userdetailsobj={this.props.userdetailsobj} 
                                /> */}
                        </Col>
                    </Row>
                    
                </Card>
            </div>
        </React.Fragment>
    }
}

export default connect(
    state => ({
        // 'dashboardProps': Map(state.dashboard),
    })
)(Dashboard);
