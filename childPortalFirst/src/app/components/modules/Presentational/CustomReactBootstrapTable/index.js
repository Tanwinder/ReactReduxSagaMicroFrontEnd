import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import './ReactBootstrap.scss';

class OptimizationData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {

		return (
			<div className="cards_table poExceptionCard">
				<BootstrapTable
					containerStyle={{ height: '150px', overflowY: 'scroll' }}
					keyField='deptId'
					data={data ? data : []}
					columns={columns}
					bordered={false}
				/>
			</div>
		);
	}
}
export default OptimizationData;