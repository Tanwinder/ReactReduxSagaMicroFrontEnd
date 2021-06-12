import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { withTheme } from 'theming';
import { connect } from 'react-redux';
import { handleCases } from './../../../themes/ImsThemes';
// import PropTypes from 'prop-types';
import routes from '../../routes';
var pjson = require('../../../../package.json');

class Footer extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	modal: false
	    };
	    this.toggle = this.toggle.bind(this);
	}

	toggle() {
	    this.setState(prevState => ({
	    	modal: !prevState.modal
	    }));
	}
  
  	render() {
		let { theme, preferences } = this.props;
		theme = handleCases(preferences)
	    return (
	     	<footer className="app-footer" className={`app-footer ${theme}`}>
	     		<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
		        	<ModalHeader toggle={this.toggle}>Merchandising</ModalHeader>
		        	<ModalBody>
			            <Table>
					        <thead>
					        	<tr>
						            <th>#</th>
						            <th>App Name</th>
						            <th>Version</th>
						        </tr>
					        </thead>
					        <tbody>
								{Object.values(routes).map((e,i) => {
                                    return <tr key={i}>
										<th scope="row">{i + 1}</th>
						            	<td>{e}</td>
						            	<td>{pjson.version}</td>
                                    </tr>
                                })}
					        </tbody>
					    </Table>
		          	</ModalBody>
		          	<ModalFooter>
		            	<Button color="primary" onClick={this.toggle}>OK</Button>
		          	</ModalFooter>
		        </Modal>
	        	<span className="themeStyles"><a href="#">Sidhu's</a> &copy; 2020</span>
	        	<span className="ml-auto themeStyles">Powered by <a href="#" onClick={this.toggle}>sid</a></span>
	      	</footer>
	    )
  	}
}
const mapStateToProps = state => {
	// console.log(state.homepage.userData.preferences,'---------------------------');
	return{
	 preferences: state.homePage.userData.preferences
	};
   };
//    Footer.propTypes = {
// 	theme: PropTypes.string
//   };
export default withTheme(connect(mapStateToProps)(Footer));
