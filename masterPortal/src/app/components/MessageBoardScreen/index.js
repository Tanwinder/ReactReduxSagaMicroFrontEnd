import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment';
import './MessageBoardScreen.scss';
import LoadingBar from 'react-redux-loading-bar';
import { 
    
} from '../../actions';
import cn from 'classnames';
import {
    Alert,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Collapse,
    CardFooter,
    Button,
    ButtonGroup,
    TabContent,
    UncontrolledTooltip,
    Modal, ModalHeader, ModalBody, ModalFooter
  } from 'reactstrap';
import { PulseLoader } from 'halogenium';
import Notifications from 'react-notification-system-redux';
import ReactStrapTable from './ReactStrapTable'
import AddNewMessage from './AddNewMessage';
import AppNames from './data'


class MessageBoardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messagePanel: true,
            AddNewMessagePanel: false,
            firstLoadMessagePanel: false,
            appMessages: [],
            AppNames: AppNames,
            selectedAppName: null,
            messageValue: "",
            updateMessageValue: undefined
        }

        this.handleRetry = this.handleRetry.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleReload = this.handleReload.bind(this);
        this.handleDeptExpandOrCollapse = this.handleDeptExpandOrCollapse.bind(this);
    }
    handleDeptExpandOrCollapse() {
        this.setState({
            messagePanel: !this.state.messagePanel
        })
    }

    handleAddNewMessagePanel = () => {
        this.setState({
            AddNewMessagePanel: !this.state.AddNewMessagePanel
        })
    }
    AddMessageButton = () => {
        this.setState({
            messagePanel: false,
            AddNewMessagePanel: true,
            firstLoadMessagePanel: true
        })
    }

    handleCancel(){
        this.props.dispatch(Notifications.removeAll());
        this.props.dispatch({type: 'PRODUCT_PANEL', productPanel: true});
    }

    handleReload(){
        window.location.reload();
    }

    handleRetry(){
        let {notifications} = this.props;
        if (notifications && notifications.length > 0 && notifications.some(notification => notification.uid == 1)){
            Notifications.hide(1);
            this.props.dispatch(getAllProductData());
        }
        if (notifications && notifications.length > 0 && notifications.some(notification => notification.uid == 2)){
            Notifications.hide(2);
            this.props.dispatch(getFiscalMonthWeek());
        }
        if (notifications && notifications.length > 0 && notifications.some(notification => notification.uid == 3)){
            Notifications.hide(3);
            this.props.dispatch(getFiscalPredictionDates());
        }
        if (notifications && notifications.length > 0 && notifications.some(notification => notification.uid == 4)){
            Notifications.hide(4);
            this.props.dispatch(onClassDropdownClick(this.props.dept));
        }
        if (notifications && notifications.length > 0 && notifications.some(notification => notification.uid == 5)){
            Notifications.hide(5);
            this.props.dispatch(SearchButtonClick(this.props.searchObj));
        }
    }
    onChangeMessageValue = (event) => {
        this.setState({messageValue: event.target.value});
    }

    SetMessageButton = () => {
        let selectedApps = this.state.selectedAppName;
        let apps = this.state.appMessages;
        selectedApps && selectedApps.forEach(element => {
            if(!this.state.appMessages || !(this.state.appMessages && this.state.appMessages.find( ac => ac.id === element.id))) {
                apps.push({
                    label: element.label,
                    id: element.id,
                    displayName: element.displayName,
                    message: this.state.messageValue
                })
            }
            
        });
        let ghAppNames = this.state.AppNames.map(ac => ({
            ...ac,
            isChecked: false,
        }));
        this.setState({
            appMessages: apps,
            messagePanel: true,
            AddNewMessagePanel: false,
            selectedAppName: null,
            messageValue: "",
            AppNames: ghAppNames
        })
    }

    onFilterChange = (value) => {
        let ghValue = this.state.AppNames.filter(ac => value.id == ac.id ? !!value.isChecked : !!ac.isChecked );
        let ghAppNames = this.state.AppNames.map(ac => ac.id === value.id ? value : ac);
        this.setState({
            selectedAppName: ghValue,
            AppNames: ghAppNames
        })
    }

    onDeleteMessages = (item) => {
        let updatedList = this.state.appMessages.filter( ac => ac.id !== item.id );
        this.setState({
            appMessages: updatedList
        })
    }
    onClickUpdateMessage = (item) => {
        let messageToBeUpdated = "";
        let AppMessagesList = this.state.appMessages.map( ac => {
            if(ac.id === item.id) {
                messageToBeUpdated = ac.message;
                return {
                    ...ac,
                    editMode: true
                }
            }
            return ac;
        } );
        this.setState({
            appMessages: AppMessagesList,
            updateMessageValue: messageToBeUpdated
        })
    }

    onUpdateMessageValue = (event) => {
        this.setState({updateMessageValue: event.target.value});
    }

    onSaveUpdateMessage= (item) => {
        let AppMessagesList = this.state.appMessages.map( ac => {
            if(ac.id === item.id) {
                return {
                    ...ac,
                    message: this.state.updateMessageValue,
                    editMode: false
                }
            }
            return ac;
        } );
        this.setState({
            appMessages: AppMessagesList,
            updateMessageValue: undefined
        })
    }

    render() {
        const { messagePanel, AddNewMessagePanel, selectedAppName, firstLoadMessagePanel, updateMessageValue } = this.state;
        const {
            loadingActionType,
            notifications
         } = this.props;
        return (
            <div className="message_board" style={{margin: "0px -30px", minWidth: "50vw"}} >
                <Card style={{marginBottom: '.5rem'}} >            
                    <CardHeader style={{position: 'relative', background: (messagePanel ? '' : '#f0f3f5'), borderTop: (messagePanel ? '' : '1px solid #c2cfd6'), borderBottom: (messagePanel ? 'none' : '1px solid #c2cfd6')}}>                    
                        <div style={{display: 'flex'}}>
                            <span style={{}}>Message Board</span>
                            {notifications && notifications.length > 0 && notifications.some(notification => notification.message == 'loading' && notification.uid != 5) && <PulseLoader color="rgb(32, 168, 216)" size="12px" margin="4px" style={{margin: 'auto'}} />}
                            <span style={{marginLeft:'auto'}} className={"Demand_Cards_Button" + (messagePanel ? " Compress" : " Expand")} onClick={() => this.handleDeptExpandOrCollapse()}>
                                <i className="fa fa-angle-down" style={{fontSize: '18px'}}></i>
                            </span>
                        </div>
                        {/* <div style={{position: 'relative'}}>{ !!loadingActionType && loadingActionType === 'allProduct' ? 
                            <LoadingBar style={{ backgroundColor: '#20a8d8', height: '2px', marginTop: '4px' }} /> 
                            : "" 
                            }</div> */}
                    </CardHeader>
                    <Collapse isOpen={messagePanel}>
                        {messagePanel ? 
                            <CardBody style={{padding: "1rem 4rem"}} >
                                {
                                    !!this.state.appMessages && this.state.appMessages.length > 0 ?
                                    <Row>
                                        <Col sm="12" md="11" lg="10" xl="9" >
                                        <ReactStrapTable
                                            appMessages={this.state.appMessages}
                                            onDeleteMessages={this.onDeleteMessages}
                                            updateMessageValue={updateMessageValue}
                                            onClickUpdateMessage={this.onClickUpdateMessage}
                                            onUpdateMessageValue={this.onUpdateMessageValue}
                                            onSaveUpdateMessage={this.onSaveUpdateMessage} />
                                        </Col>
                                    </Row>
                                    :""
                                }
                                <Row>
                                    <Col sm="12" md="11" lg="10" xl="9" style={{textAlign: "left"}}>
                                        <Button 
                                            size="lg" 
                                            color='info'
                                            onClick={() => this.AddMessageButton()}
                                            style={{marginTop:'10px'}}
                                            disabled={updateMessageValue !== undefined}
                                            >
                                            <i className="fas fa-plus" aria-hidden="true"></i>{' Add Message'}
                                        </Button>
                                    </Col>
                                </Row> 
                            </CardBody>
                        :""}
                    </Collapse>
                    {/* <Modal isOpen={notifications && notifications.length > 0 && notifications.some(notification => notification.level == 'error')}>
                        <ModalHeader><i className="fa fa-bell-o" style={{margin:'0 10px', color:'#20a8d8'}} onClick={() => {window.location.href.includes('localhost') ? this.props.dispatch(Notifications.removeAll()) : null}}></i>Notifications</ModalHeader>
                        <ModalBody>
                            <Alert color='danger'>
                                <div style={{display: 'flex', fontSize:'12.5px'}}>
                                    <i className="fa fa-exclamation-triangle" style={{marginRight:'10px', paddingTop:'2px', fontSize:'14px'}}></i>
                                    {"Sorry. Our system failed to load some data."}
                                    <br />
                                    {"Please select an option to proceed."}
                                    
                                </div>
                            </Alert>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" style={{fontSize:'12.5px'}} onClick={this.handleCancel}>Cancel</Button>
                            <Button title="Reload this page" outline color="info" style={{marginLeft:'auto', marginRight:'.75rem', fontSize:'12.5px'}} onClick={this.handleReload}>Reload</Button>
                            <Button title="Search again" style={{fontSize:'12.5px'}} color="info" onClick={this.handleRetry}>Retry</Button>
                        </ModalFooter>
                    </Modal> */}
                </Card>
                {
                    firstLoadMessagePanel? 
                    <Card>            
                    <CardHeader style={{position: 'relative', background: (AddNewMessagePanel && !messagePanel ? '' : '#f0f3f5'), borderTop: (AddNewMessagePanel && !messagePanel ? '' : '1px solid #c2cfd6'), borderBottom: (AddNewMessagePanel && !messagePanel ? 'none' : '1px solid #c2cfd6')}}>                    
                        <div style={{display: 'flex'}}>
                            <span style={{}}>Add New Message</span>
                            <span style={{marginLeft:'auto'}} className={"Demand_Cards_Button" + (AddNewMessagePanel && updateMessageValue === undefined ? " Compress" : " Expand")} onClick={() => updateMessageValue === undefined && this.handleAddNewMessagePanel()}>
                                <i className="fa fa-angle-down" style={{fontSize: '18px'}}></i>
                            </span>
                        </div>
                    </CardHeader>
                    <Collapse isOpen={AddNewMessagePanel && updateMessageValue === undefined}>
                        {AddNewMessagePanel ? 
                            <CardBody style={{padding: "1rem 4rem"}}>
                                <Row style={{alignItems: 'end'}}>
                                    <Col sm="12" md="11" lg="10" xl="9" >
                                    <AddNewMessage
                                        AppNames={this.state.AppNames}
                                        selectedAppName={this.state.selectedAppName}
                                        SetMessageButton={this.SetMessageButton}
                                        onFilterChange={this.onFilterChange}
                                        onChangeMessageValue={this.onChangeMessageValue}
                                        messageValue={this.state.messageValue}
                                         />
                                    </Col>
                                </Row> 
                            </CardBody>
                        :""}
                    </Collapse>
                </Card>
                    : ""
                }
            </div>
        )
    }
}

MessageBoardScreen.propTypes = {
}

const mapStateToProps = state => {
    return {
        notifications: state.notifications
    }
}


export default connect(mapStateToProps)(MessageBoardScreen);
