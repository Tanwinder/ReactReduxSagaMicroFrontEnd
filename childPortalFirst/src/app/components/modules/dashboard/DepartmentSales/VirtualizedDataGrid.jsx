import React, { PureComponent } from 'react';
import { Grid, AutoSizer, ScrollSync, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import cn from 'classnames';
import { Input } from 'reactstrap';
import Icon from '@mdi/react'
import { mdiRestore, mdiFilter, mdiFileExport } from '@mdi/js';
import { CSVLink, CSVDownload } from 'react-csv';
import DropdownFilter from '../../Presentational/CheckBoxFilter/DropdownFilter';
import Select, {Option, OptGroup} from 'rc-select';
import 'rc-select/assets/index.css';
import SingleDateRangePicker from '../../Presentational/SingleDateRangePicker/SingleDateRangePicker'
// import DateRange from './DateRange';
import moment from 'moment';

export default class VirtualizedDataGrid extends PureComponent {

    constructor(props) {

        super(props);
        this.state = {
            'scrollingBar': false,
            'NavBarWidth': 0,
            'tableBody': [["PO", "Dept Number", "Vendor", "OTB WK", "OPC SC(Qt,%,Count)", "OPC Quantity", "OPC SKU Count", "NON-OPC SC", "NON-OPC SKU Count", "Include PO/ Exclude PO"]],
            'tableData': [],
            'sortDirection': [],
            dbEnable: false
        }
        this.onFocusChange = this.onFocusChange.bind(this);
		this.onChangePOFreezeDate = this.onChangePOFreezeDate.bind(this);
    }


    componentWillUpdate = () => {
        this.refs.scrollSync.refs.AutoSizer.refs.HeaderGrid.forceUpdate();
        this.refs.scrollSync.refs.AutoSizer.refs.BodyGrid.forceUpdate();
        // this.refs.scrollSync.refs.AutoSizer.refs.FooterGrid.forceUpdate();
        this.refs.scrollSync.refs.AutoSizer.refs.HeaderGrid.recomputeGridSize();
        this.refs.scrollSync.refs.AutoSizer.refs.BodyGrid.recomputeGridSize();
        // this.refs.scrollSync.refs.AutoSizer.refs.FooterGrid.recomputeGridSize();
    }

    updateAutoSizerWidth = (width) => {
        this.setState({ NavBarWidth: width })
    }

	onChangePOFreezeDate = (val) => {
		this.props.onChangePOFreezeDate(val);
	}
	
	onFocusChange(bool){
        let overflow = bool ? 'visible' : '';
        this.setState({overflow});
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

    handleSort = (columnIndex, columnKey) => {
        let sortDir = this.state.sortDirection, x = [];
        if(this.props.data && this.props.data.length > 0){

            if(!sortDir[columnIndex]){
                x[columnIndex] = "ASC";
                this.setState({sortDirection: x})
            }else if(sortDir[columnIndex] == "ASC"){
                x[columnIndex] = "DESC";
                this.setState({sortDirection: x})
            }else if(sortDir[columnIndex] == "DESC"){
                x[columnIndex] = "ASC";
                this.setState({sortDirection: x})
            }

            if( columnIndex >= 0 && columnIndex < 6 ){
                if(!sortDir[columnIndex] || sortDir[columnIndex] == "DESC"){
                    this.props.data.sort((a, b) => (a[columnKey] > b[columnKey]) ? 1 : -1)
                }
                else if(sortDir[columnIndex] == "ASC"){
                    this.props.data.sort((a, b) => (b[columnKey] > a[columnKey]) ? 1 : -1)
                }
            }else if(columnIndex >= 6  && columnIndex < 8){
                if(!sortDir[columnIndex] || sortDir[columnIndex] == "DESC"){
                    this.props.data.sort((a, b) => {
                        return new Date(a[columnKey]) - new Date(b[columnKey]);
                    })
                }
                else if(sortDir[columnIndex] == "ASC"){
                    this.props.data.sort((a, b) => {
                        return new Date(b[columnKey]) - new Date(a[columnKey]);
                    })
                }
            }
            this.props.sortData();
        }
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
                                    {/* <div
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
                                    </div> */}
                                    <div
                                        className="filterIcon filter"
                                        style={{ position: "initial" }}>
                                        <Icon
                                            path={mdiFilter}
                                            size={1}
                                            color="gray"
                                            onClick={() => this.props.onClickFilterOn()}
                                        />
                                    </div>
                                </div>
                            </div> :
                            <div>
                                {content}
                                {columnIndex >= 0 && columnIndex < 8 &&
                                    <span className="order" style={{ color: "#ccc" }} onClick={() => this.handleSort(columnIndex, columnKey)}>
                                    {
                                        this.state.sortDirection[columnIndex] != "ASC" && this.state.sortDirection[columnIndex] != "DESC" &&
                                        <span>
                                            <span className="dropdown">
                                                <span className="caret"></span>
                                            </span>
                                            <span className="dropup">
                                                <span className="caret"> </span>
                                            </span>
                                        </span>
                                    }
                                    {
                                        this.state.sortDirection[columnIndex] == "ASC" &&
                                        <span className="dropdown">
                                            <span className="caret"></span>
                                        </span>
                                    }
                                    {
                                        this.state.sortDirection[columnIndex] == "DESC" &&
                                        <span className="dropup">
                                            <span className="caret"> </span>
                                        </span>
                                    }
                                    </span>
                                }
                            </div> :
                        columnIndex >= 0 && columnIndex < 6 &&
                        <div className="filterInput">

                            <Input
                                type='text'
                                style={{ width: '100%' }}
                                // value={filterValue}
                                onChange={(e) => this.filterCapacityGroup(columnKey, e.target.value)} />
                        </div>
                }
            </div>
        )
    }

    onBeginDateSelect = (event, selectedDate, data) => {
        let date = selectedDate.toDate(), selectedDateVal = null;
        if(date){
            selectedDateVal =  date.getFullYear() + "-" + ((date.getMonth() + 1) <= 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate());
        }
        this.props.onChangePOFreezeDate(selectedDateVal, data);
      }
    
      onEndDateSelect = (event, selectedDate, data) => {
        let date = selectedDate.toDate(), selectedDateVal = null;
        if(date){
            selectedDateVal =  date.getFullYear() + "-" + ((date.getMonth() + 1) <= 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate());
        }
        this.props.onChangeEndDate(selectedDateVal, data);
      }

    _renderBodyCell = ({ columnIndex, key, parent, rowIndex, style }) => {
        const datum = this._getDatum(rowIndex);
        let columnKeyValue = this.props.activeStoreColumns[columnIndex].columnKey;
        let contentComp;
        let likeDeptVal = this.props.likeDeptFilter;
        let isEditAble = datum['isEditAble'];
        let content = datum[columnKeyValue];
        let onChangeCheckbox = (checked) => {

            this.props.togglePoException(datum.ORDER_NO, checked)
        }
        if (columnKeyValue == 'likeDept' && this.props.updateTable && (this.props.rowIndexClicked == rowIndex + 1)) {
            datum['isEditAble'] = true;
        }else {
            datum['isEditAble'] = false;
        }
        if (columnKeyValue == 'likeMajorClass' && this.props.updateTable && this.props.updateLikeMajorClass && (this.props.rowIndexClickedMajorClass == rowIndex + 1)) {
            datum['isEditableMajorClass'] = true;
        }else {
            datum['isEditableMajorClass'] = false;
        }
        if (columnKeyValue == 'likeSubClass' && this.props.updateTable && this.props.updateLikeMajorClass && this.props.updateLikeSubClass && (this.props.rowIndexClickedSubClass == rowIndex + 1)) {
            datum['isEditableSubClass'] = true;
        }else {
            datum['isEditableSubClass'] = false;
        }
        if (columnKeyValue == 'beginDate' && this.props.updateBeginDate && (this.props.rowIndexClickedBeginDate == rowIndex + 1)) {
            datum['isEditableBeginDate'] = true;
        }else {
            datum['isEditableBeginDate'] = false;
        }
        if (columnKeyValue == 'endDate' && this.props.updateEndDate && (this.props.rowIndexClickedEndDate == rowIndex + 1)) {
            datum['isEditableEndDate'] = true;
        }else {
            datum['isEditableEndDate'] = false;
        }

        if(columnKeyValue == 'beginDate'){
            let beginDate = content;
            let beginDateArray = beginDate.split("-");

            contentComp = (datum['isEditableBeginDate']) ?
            <SingleDateRangePicker
                key={key}
                dateRestriction={moment().subtract(10, 'years')}
                content={beginDateArray[1] + '/' + beginDateArray[2] + '/' + beginDateArray[0]}
                onDateSelect={this.onBeginDateSelect}
                data={datum}
                />

            : <div onClick={(e) => this.props.onBeginDateClick(true, datum)} >{beginDateArray[1] + '/' + beginDateArray[2] + '/' + beginDateArray[0]}</div>;
        }else if(columnKeyValue == 'endDate'){
            let endDate = content;
            let endDateArray = endDate.split("-");
            contentComp = (datum['isEditableEndDate']) ?
            <SingleDateRangePicker
                dateRestriction={moment().subtract(10, 'years')}
                key={key}
                content={endDateArray[1] + '/' + endDateArray[2] + '/' + endDateArray[0]}
                onDateSelect={this.onEndDateSelect}
                data={datum}
                />

            : <div onClick={(e) => this.props.onEndDateClick(true, datum)} >{endDateArray[1] + '/' + endDateArray[2] + '/' + endDateArray[0]}</div>;
        }else if (columnKeyValue == 'likeDept'){
            contentComp = (datum['isEditAble']) ?
            <Select 
                name="select" 
                id="deptList" 
                placeholder='Select'
                className={this.props.updatedLikeDept && this.props.updatedLikeDept[rowIndex] ? "custom-update" : ""}
                onSelect={(val) => {
                    this.props.onCapacityChanged(parseInt(val), datum);
                    this.props.getUpdateLikeMajorClassFilter(parseInt(val));
                }}
                backfill
                filterOption={true}
                value={this.props.data && this.props.data[rowIndex].likeDept}
                dropdownStyle={{height: 'auto',maxHeight:'120px',width:'180px',backgroundColor:'white'}}
                dropdownMenuStyle={{height: 'auto',maxHeight:'120px',width:'180px',backgroundColor:'white'}}
            >
              {likeDeptVal ? likeDeptVal.map(mc =>
                <Option value={mc.id} id={mc.id} desc={mc.id} rowindex={rowIndex}>{mc.id}</Option>
              )
                : ''
              }
            </Select>
            : <div style={{fontWeight: this.props.updatedLikeDept && this.props.updatedLikeDept[rowIndex] ? "bold" : "normal"}} onClick={(e) => this.props.onCapacityClicked(true, datum)} >{content}</div>;
        } else if (columnKeyValue == 'likeMajorClass'){
            contentComp = (datum['isEditableMajorClass']) ?
            <Select 
                name="majorClass" 
                id="majorClassList" 
                placeholder='Select'
                className={this.props.updatedMajorClass && this.props.updatedMajorClass[rowIndex] ? "custom-update" : ""}
                onSelect={(val) => {
                    this.props.onLikeMajorClassUpdate(parseInt(val), datum)
                    this.props.getUpdateLikeSubClassFilter(parseInt(val));
                }}
                backfill
                filterOption={true}
                value={this.props.data && this.props.data[rowIndex].likeMajorClass}
                dropdownStyle={{height: 'auto',maxHeight:'120px',width:'180px',backgroundColor:'white'}}
                dropdownMenuStyle={{height: 'auto',maxHeight:'120px',width:'180px',backgroundColor:'white'}}
            >
              {this.props.updateLikeMajorClassFilter != null ? this.props.updateLikeMajorClassFilter.map(mc =>
                <Option value={mc.displayDesc && mc.displayDesc.split("-")[1]} id={mc.id} desc={mc.id} rowindex={rowIndex}>{mc.displayDesc && mc.displayDesc.split("-")[1]}</Option>
              )
                : ''
              }
            </Select>
            : <div style={{fontWeight: this.props.updatedMajorClass && this.props.updatedMajorClass[rowIndex] ? "bold" : "normal"}} onClick={(e) => this.props.onLikeMajorClassClicked(true, datum)} >{content !== 0 ? content : 0}</div>;
        } else if (columnKeyValue == 'likeSubClass'){
            contentComp = (datum['isEditableSubClass']) ?
            <Select 
                name="subClass" 
                id="subClassList" 
                placeholder='Select'
                className={this.props.updatedSubClass && this.props.updatedSubClass[rowIndex] ? "custom-update" : ""}
                onSelect={(val) => this.props.onLikeSubClassUpdate(parseInt(val), datum)}
                backfill
                filterOption={true}
                value={this.props.data && this.props.data[rowIndex].likeSubClass}
                dropdownStyle={{height: 'auto',maxHeight:'120px',width:'180px',backgroundColor:'white'}}
                dropdownMenuStyle={{height: 'auto',maxHeight:'120px',width:'180px',backgroundColor:'white'}}
            >
              {this.props.updateLikeSubClassFilter != null ? this.props.updateLikeSubClassFilter.map(mc =>
                <Option value={mc.displayDesc && mc.displayDesc.split("-")[2]} id={mc.id} desc={mc.id} rowindex={rowIndex}>{mc.displayDesc && mc.displayDesc.split("-")[2]}</Option>
              )
                : ''
              }
            </Select>
            : <div style={{fontWeight: this.props.updatedSubClass && this.props.updatedSubClass[rowIndex] ? "bold" : "normal"}} onClick={(e) => this.props.onLikeSubClassClicked(true, datum)} >{content !== 0 ? content : 0}</div>;
        } else if(columnKeyValue == 'saveDelete'){
            contentComp = <div>
            <span style={{ display: 'inline-block', margin: '5px' }}>
                <i
                    className={`fas fa-save cur-pointer ${( (this.props.data[rowIndex].likeMajorClass != "-" && 
                                        // this.props.data[rowIndex].likeSubClass != "-" && 
                                        (this.props.updatedLikeDeptRows && this.props.updatedLikeDeptRows[rowIndex] == true)) || 
                                        (this.props.updatedBeginDate && this.props.updatedBeginDate[rowIndex] || this.props.updatedEndDate && this.props.updatedEndDate[rowIndex]) ?
                                         "enable-save-btn" : 
                                         "disable-save-btn")}`}
                    style={{ fontSize: '1.4rem', position: 'absolute', top: '9px' }}
                    title="Save"
                    onClick={() => this.props.updateDepartment(rowIndex)}
                ></i>
            </span>
            <span style={{ display: 'inline-block', margin: '5px' }}>
                <i
                    className="fas fa-trash cur-pointer"
                    style={{ fontSize: '1.3rem', color: 'gray', marginLeft: '15px' }}
                    title="Delete"
                    onClick={() => this.props.deleteDepartment(rowIndex)}
                ></i>
            </span>
        </div>;
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
                                            <div className="opc_subclass_virtual_header" style={{ height: displayFilterRow ? 100 : 50, width: width }}>
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
                                                    noContentRenderer={this._noContentRenderer} 
                                                    />
                                            </div>
                                            
                                        </div>
                                    )
                                }}
                            </AutoSizer>
                        </div>
                        <input id="likeDeptRowCount" type="hidden" value={this.props.data.length} />
                    </div>
                );
            }}
            </ScrollSync>
        )
    }
}