import React from 'react';
import axios from 'axios'
import { FormGroup, Label, Input, Col, Row, Button, Table, Alert } from 'reactstrap';
import LikeDepartmentSales from './likeDepartmentSales';
import Icon from '@mdi/react'
import { mdiRestore, mdiFilter } from '@mdi/js'
import ReactSVG from 'react-svg';
import cn from 'classnames';
import LoadingBar from 'react-redux-loading-bar';

class DepartmentSales extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { header, svg, collapse, data } = this.props;
        const bodyCollapse = cn({
            "AdCards": true,
            "AdCardsBody_collapse": collapse,
        });
		return (
			<div className={bodyCollapse}>
                <div className="AdCardsHeader">
                    <ReactSVG className="AdCards_Svg" svgStyle={{ width: 34, height: 'auto' }} src={svg} />
                    <span className="AdCards_Heading"> {header} </span>
                    <span className="AdCards_Button" onClick={this.props.onExpandCard}>
                        <i className="fa fa-angle-down"></i>
                    </span>
                </div>
                {/* <div className="AdCardsBody" style={{ overflow:(collapse?'visible':'') }}> */}
                <div className="AdCardsBody" style={{ overflow:(collapse?'visible':''), minHeight: (collapse&&'360px'), height: (collapse&&'450px') }}>
                <div style={{
                        overflow:'hidden',
                         width: '100%', 
                         padding:'0', 
                         margin: '0'
                    }}>
                    <LoadingBar className='loading-bar' scope="allocationControlBar" showFastActions />
                    </div>
                    <div className="AdCardsBody_inner">
                		<LikeDepartmentSales userdetailsobj={this.props.userdetailsobj} />
                    </div>
                </div>               
            </div>
		)
	}

}

export default DepartmentSales;