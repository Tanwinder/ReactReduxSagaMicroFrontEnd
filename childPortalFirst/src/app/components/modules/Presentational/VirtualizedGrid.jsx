import React, { PureComponent } from 'react';
import { Grid, AutoSizer, ScrollSync, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import cn from 'classnames';
import { Input } from 'reactstrap';
import Icon from '@mdi/react'
import { mdiRestore, mdiFilter, mdiFileExport } from '@mdi/js';
import { CSVLink, CSVDownload } from 'react-csv';


export default class VirtualizedDataGrid extends PureComponent {

	constructor(props) {

		super(props);
		this.state = {
			'scrollingBar': false,
			'NavBarWidth': 0,
			'tableBody': [["PO", "Dept Number", "Vendor", "OTB WK", "OPC SC(Qt,%,Count)", "OPC Quantity", "OPC SKU Count", "NON-OPC SC", "NON-OPC SKU Count", "Include PO/ Exclude PO"]],
			'tableData': [],
			dbEnable: false
		}
	}


	componentWillUpdate = () => {
		this.refs.scrollSync.refs.AutoSizer.refs.HeaderGrid.forceUpdate();
		this.refs.scrollSync.refs.AutoSizer.refs.BodyGrid.forceUpdate();
		this.refs.scrollSync.refs.AutoSizer.refs.FooterGrid.forceUpdate();
		this.refs.scrollSync.refs.AutoSizer.refs.HeaderGrid.recomputeGridSize();
		this.refs.scrollSync.refs.AutoSizer.refs.BodyGrid.recomputeGridSize();
		this.refs.scrollSync.refs.AutoSizer.refs.FooterGrid.recomputeGridSize();
	}

	updateAutoSizerWidth = (width) => {
		this.setState({ NavBarWidth: width })
	}

	_getColumnWidth = ({ index }) => {

		let minWidth = 20;
		let parentWidth = this.refs.scrollSync.refs.AutoSizer.state.width;
		let columnWidth = this.props.activeStoreColumns[index].width;

		let retWidth = columnWidth * parentWidth / 100;

		return retWidth
	}

	_getDatum = (index) => {
		const { data } = this.props;
		return data[index];
	}

	_noContentRenderer = () => {
		return (
			<div className='noCells'>
				No Records found
            </div>
		)
	}

	onCapacityChanged = (e, datum) => {
		this.props.onCapacityChanged(e.target.value, datum);
	}

	onKeyPress = (e, datum) => {
		var charCode = (e.which) ? e.which : e.keyCode;
		if (e.key === 'Enter') {
			this.props.onCapacityClicked(false, datum)
		}
		else if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
			e.preventDefault();
	}

	filterCapacityGroup = (index, val) => {

		if (val) {
			this.props.filterChange(true);
		} else {
			this.props.filterChange(false);
		}

		this.setState({ dbEnable: true });
		this.props.filterCapacityGroup(index, val);


	}

	downloadContent = (data) => {
		let tempBody = [];
		let tableBdy = this.state.tableBody;
		let tableDt = this.state.tableDatas;
		let colKey = ["ORDER_NO", "DEPT", "SUP_NAME", "OTB_EOW_DATE", "OPC_SUB_CLASS", "OPC_QTY_TOTAL", "OPC_SC_TOTAL", "OPC_SKU_TOTAL", "NON_OPC_SUB_CLASS", "NON_OPC_SKU_COUNT", "currentState"];
		colKey.map((cKey) => {

			tempBody.push(cKey == 'currentState' ? data[cKey].toString() : data[cKey]);

		})
		tableBdy.push(tempBody);
		tableDt.push(data.ORDER_NO);

		this.setState({ tableDatas: tableDt, tableBody: tableBdy });
	}

	test() {

		let colKey = ["ORDER_NO", "DEPT", "SUP_NAME", "OTB_EOW_DATE", "OPC_SUB_CLASS", "OPC_QTY_TOTAL", "OPC_SC_TOTAL", "OPC_SKU_TOTAL", "NON_OPC_SUB_CLASS", "NON_OPC_SKU_COUNT", "currentState"];
		let tableData = [];
		this.props.data.map((data) => {
			data.currentState = data.currentState.toString();
			tableData.push(data);

		});
		this.setState({ tableData: tableData })
	}

	getCsvData = (data) => {
		let orderColumns = this.props.activeStoreColumns;
		let gh = data.map(ac => {
			return {
				"PO": `${ac["ORDER_NO"]}`,
				"Dept": `${ac["DEPT"]}`,
				"Vendor": `${ac["SUP_NAME"]}`,
				"OTB WK": `${ac["OTB_EOW_DATE"]}`,
				"OPC SC (Units,%, Sku Count)": `${ac["OPC_SUB_CLASS"]}`,
				"OPC Tot SKU Count": `${ac["OPC_SKU_TOTAL"]}`,
				"OPC Tot Units": !!ac["OPC_QTY_TOTAL"] ? `${ac["OPC_QTY_TOTAL"]}` : '',
				"NON-OPC SC": !!ac["NON_OPC_SUB_CLASS"] && ac["NON_OPC_SUB_CLASS"] > 0 ? `${ac["NON_OPC_SUB_CLASS"]}` : 'n/a',
				"NON-OPC Tot SKU Count": !!ac["NON_OPC_SKU_COUNT"] ? `${ac["NON_OPC_SKU_COUNT"]}` : 0,
				"Exclude-PO": `${ac["checked"]}`,
			}
		});
		return gh;
	}

	_renderHeaderCell = ({ columnIndex, key, parent, rowIndex, style }) => {

		let content = this.props.activeStoreColumns[columnIndex].columnDesc;
		let columnKey = this.props.activeStoreColumns[columnIndex].columnKey;

		var cellClasses = cn({
			'headerCell': true,
			'centeredCell': true,
			'cellLeftMost': columnIndex === 0,
		});
		var currentDate = new Date();
		var currentDateTime = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
		const classNames = cn(cellClasses);

		return (
			<div className={classNames} style={{ ...style, overflow: 'visible' }} key={content} title={content}>

				{
					rowIndex == 0 ?
						columnIndex == 9 ?
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<div>{content}</div>
								<div
									style={{
										cursor: 'pointer',
										display: 'flex',
										width: '40px',
										justifyContent: 'space-around',
										marginLeft: '24px',
									}}
								>
									<div
										onClick={this.test.bind(this)}
									>
										<CSVLink
											data={this.getCsvData(this.state.tableData)}
											filename={currentDateTime + "PO Exception.csv"}
											className=" "
											target="_blank" >
											<span className="downLoad">
												<Icon path={mdiFileExport} size={1} color="gray" />
											</span>
										</CSVLink>
									</div>
									<div
										className="filterIcon"
										style={{ marginLeft: '10px' }}>
										<Icon
											path={mdiFilter}
											size={1}
											color="gray"
											onClick={() => this.props.onClickFilterOn()}
										/>
									</div>
								</div>
							</div> :
							<div>{content}</div> :
						<Input
							type='text'
							style={{ width: '100%' }}
							// value={filterValue}
							onChange={(e) => this.filterCapacityGroup(columnKey, e.target.value)} />
				}
			</div>
		)
	}

	_renderBodyCell = ({ columnIndex, key, parent, rowIndex, style }) => {

		const datum = this._getDatum(rowIndex);
		//  this.props.data.forEach(datum => {
		let columnKeyValue = this.props.activeStoreColumns[columnIndex].columnKey;
		let contentComp;
		let content = datum[columnKeyValue];



		let onChangeCheckbox = (checked) => {

			this.props.togglePoException(datum.ORDER_NO, checked)
		}

		if (columnKeyValue == "checked") {
			contentComp = <div>
				<label className="exception-switch">
					<input id={"cb2" + key} checked={!datum.checked} type="checkbox" onChange={e => { onChangeCheckbox(!e.target.checked) }} />
					<span className="exception-slider round"></span>
					<span style={{ position: 'absolute', top: '4px', fontSize: '8px', color: 'white', paddingLeft: (!datum.checked ? '5px' : '25px') }}>{!datum.checked ? 'OPC' : 'NON-OPC'}</span>
				</label>
			</div>

		} else if (columnKeyValue == 'NON_OPC_SUB_CLASS') {
			contentComp = !!content && content.length > 0 ? <span className="poExceptionColValue">{content}</span> : 'n/a';
		} else if (columnKeyValue == 'NON_OPC_SKU_TOTAL') {
			contentComp = !!content ? <span className="poExceptionColValue">{content}</span> : 0;
		} else {
			contentComp = <span className="poExceptionColValue">{content}</span>;
		}

		var cellClasses = cn({
			'cell': true,
			'cellLeftMost': columnIndex === 0,
			'oddRow': rowIndex % 2 === 1,
			'evenRow': rowIndex % 2 === 0,
		});

		const classNames = cn(cellClasses);

		return (
			<div className={classNames} style={{ ...style, }} key={key} title={content}>
				{contentComp}
			</div>
		)
		// });
	}

	_renderFootercell = ({ columnIndex, key, parent, rowIndex, style }) => {

		let content = this.props.activeStoreColumns[columnIndex].columnDesc;

		var cellClasses = cn({
			'headerCell': true,
			'centeredCell': true,
			'cellLeftMost': columnIndex === 0,
		});

		if (this.props.activeStoreColumns[columnIndex].columnKey == "PO" || columnIndex == 0) {
			return <div style={{ padding: "10px 9px", borderLeft: 'none' }}> Total</div>
		}

		if (this.props.activeStoreColumns[columnIndex].columnKey == "OPC_QTY_TOTAL") {
			return <div className={cn(cellClasses)} style={{ ...style, borderLeft: 'none' }} key={this.props.activeStoreColumns[columnIndex].id} title={content}>
				<span>
					{/* Quantity = */}
					{
						this.props.data.map((p) => {
							return { 'quantity': p.OPC_QTY_TOTAL, 'checked': p.checked }
						}).reduce((total, i) => { return total + (!i.checked ? i.quantity : 0) }, 0)
					}</span>
			</div>
		}
		if (this.props.activeStoreColumns[columnIndex].columnKey == "OPC_SC_TOTAL") {
			return <div className={cn(cellClasses)} style={{ ...style, borderLeft: 'none' }} key={this.props.activeStoreColumns[columnIndex].id} title={content}>
				<span>
					{/* Subclass Count = */}
					{
						this.props.data.map((p) => {
							return { 'subclassCount': p.OPC_SC_TOTAL, 'checked': p.checked }
						}).reduce((total, i) => { return total + (!i.checked ? i.subclassCount : 0) }, 0)
					}</span>
			</div>
		}

		if (this.props.activeStoreColumns[columnIndex].columnKey == "OPC_SKU_TOTAL") {
			return <div className={cn(cellClasses)} style={{ ...style, borderLeft: 'none' }} key={this.props.activeStoreColumns[columnIndex].id} title={content}>
				<span>
					{/* Count = */}
					{
						this.props.data.map((p) => {
							return { 'skuCount': p.OPC_SKU_TOTAL, 'checked': p.checked }
						}).reduce((total, i) => { return total + (!i.checked ? i.skuCount : 0) }, 0)
					}</span>
			</div>
		}

		else {
			return <div className={cn(cellClasses)} style={{ ...style, borderLeft: 'none' }} key={this.props.activeStoreColumns[columnIndex].id} title={content}>

			</div>
		}
	}

	render() {
		const { NavBarWidth } = this.state;
		const displayFooterFilterRow = false;
		const displayFilterRow = this.props.filterOn;
		const height = '40';
		return (
			<ScrollSync ref='scrollSync'>{({ onScroll, scrollLeft }) => {
				return (
					<div className='GridRow'>
						<div className='GridColumn'>
							<AutoSizer ref='AutoSizer' disableHeight>
								{({ width }) => {
									if (width != NavBarWidth) {
										this.updateAutoSizerWidth(width)
									}
									return (
										<div>
											<div style={{ height: displayFilterRow ? 100 : 50, width: width }}>
												<Grid
													ref='HeaderGrid'
													className='HeaderGrid'
													columnWidth={this._getColumnWidth}
													columnCount={this.props.activeStoreColumns.length}
													height={displayFilterRow ? 100 : 50}
													cellRenderer={this._renderHeaderCell}
													rowHeight={50}
													rowCount={displayFilterRow ? 2 : 1}
													scrollLeft={scrollLeft}
													width={width} />
											</div>
											<div style={{ height, width }}>
												<Grid
													ref='BodyGrid'
													className='BodyGrid'
													columnWidth={this._getColumnWidth}
													columnCount={this.props.activeStoreColumns.length}
													height={140}
													onScroll={onScroll}
													overscanRowCount={2}
													overscanColumnCount={0}
													cellRenderer={this._renderBodyCell}
													rowHeight={35}
													rowCount={!!this.props.data && this.props.data.length > 0 ? this.props.data.length : 0}
													width={width}
													noContentRenderer={this._noContentRenderer} />
											</div>

											<div style={{ height, width }}>
												<Grid
													ref='FooterGrid'
													className='HeaderGrid'
													columnWidth={this._getColumnWidth}
													columnCount={this.props.activeStoreColumns.length}
													height={36}
													cellRenderer={this._renderFootercell}
													rowHeight={36}
													rowCount={1}
													scrollLeft={scrollLeft}
													width={width} />
											</div>
										</div>
									)
								}}
							</AutoSizer>
						</div>
					</div>
				);
			}}
			</ScrollSync>
		)
	}
}