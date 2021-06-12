import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import './card.scss';
import Icon from '@mdi/react';
import { mdiArrowLeftBold } from '@mdi/js';

export default class CardWidget extends React.Component {
	render() {
		const { title, btnClickHandler, bodyStyle, isBackBtn, withHeader, isClickable, onClick } = this.props;
		return (
			<Card
				style={{ marginBottom: '15px' }}
				className={`${isClickable && 'cur-pointer'} material-Cards`}
				onClick={onClick}
			>
				{withHeader && <CardHeader className="AdCardsHeader">
					<span className="AdCards_Heading">{this.props.title}</span>
					{isBackBtn && <Button
						color='info'
						size="lg"
						className="float-right"
						onClick={this.props.btnClickHandler}
					>
						Back
					</Button>}
				</CardHeader>}
				<CardBody>
					{this.props.children}
				</CardBody>
			</Card>
		)
	}
}
CardWidget.propTypes = {
	title: PropTypes.string,
	btnClickHandler: PropTypes.func,
	bodyStyle: PropTypes.object,
	isBackBtn: PropTypes.bool,
	withHeader: PropTypes.bool,
	isClickable: PropTypes.bool
}
CardWidget.defaultProps = {
	title: 'No Title',
	btnClickHandler: () => { },
	bodyStyle: {},
	isBackBtn: true,
	withHeader: true,
	isClickable: false
}
