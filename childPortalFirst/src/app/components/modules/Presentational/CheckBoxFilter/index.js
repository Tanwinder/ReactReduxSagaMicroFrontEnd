import React from 'react';
import './CheckBoxFilter.scss';
import cn from 'classnames';

export default class CheckboxFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedValues: [],
            options: [],
            showMenuVal: false,
            hasMore: true,
            filterValue: '',
            scrollLine: 0,
            val: false,
            items: []
        };
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
    }

    showMenu(event) {

        event.preventDefault();

        if (this.props.disabled === true) {

            return;
        }

        if (!!this.props.onClassDropdownClick) {

            this.props.onClassDropdownClick();
        }

        this.setState({

            showMenuVal: event.target.classList[0].indexOf("Select-placeholder") !== -1 ? true : !this.state.showMenuVal
        }, () => {

            this.searchInput.focus();
            document.addEventListener('click', this.closeMenu);
        });
    }
    closeMenuEvent = () => {
        this.setState({ showMenuVal: false, filterValue: "" }, () => {

            document.removeEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {
        if(this.props.multi === false) {
            this.closeMenuEvent();
        } else if (!!this.displayMenu && !this.displayMenu.contains(event.target) && !(event.target.classList[0] && event.target.classList[0].indexOf("Select-placeholder") !== -1)) {
            this.closeMenuEvent()
        }
    }

    onChangeFilter(e) {

        this.setState({
            filterValue: e.target.value,
            items: this.getOptions(this.props.options, e.target.value)
        });

    }

    onValueChange(event, item) {

        const checked = this.props.multi === false ? true : event.target.checked;
        let selectedValues = this.state.selectedValues;

        if (item[this.props.valueKey] === "All") {

            if (checked) {

                selectedValues = [];

                this.getOptions(this.props.options).forEach(e => {

                    selectedValues.push({ ...e, isChecked: e[this.props.valueKey] === "All" ? true : false });
                });

            } else {

                selectedValues = [];
            }

        }
        else {

            selectedValues = selectedValues.filter(p => p.isChecked);

            if (this.props.multi === false) {

                selectedValues = [];
            }

            const exists = selectedValues.find(p => p[this.props.valueKey] === item[this.props.valueKey]);


            if (exists) {

                selectedValues = selectedValues.filter(p => p[this.props.valueKey] !== item[this.props.valueKey]);

            } else {

                selectedValues.push({ ...item, isChecked: checked });
            }

            selectedValues = selectedValues.filter(p => p[this.props.valueKey] !== "All");
        }

        this.props.onChange(selectedValues, event);

        if (this.props.multi === false) {

            this.closeMenu();
        }
    }

    getOptions(options, filterText) {

        options = JSON.parse(JSON.stringify(options));

        if (!!this.state.filterValue || filterText) {

            options = options.filter(ac => ac[this.props.valueKey].toLowerCase()
                .indexOf(filterText ? filterText.toLowerCase() : this.state.filterValue.toLowerCase()) !== -1);
        }

        if (options.length > 0 && this.props.showAllOption !== false)
            options.unshift({ 'displayDesc': "All" });

        return options;
    }

    render() {

        const { options, label, classname, valueKey, placeholder, value, onClassDropdownClick } = this.props;
        const displayMenuClasses = cn({
            'menu-display': true,
            'checkbox-filter': true,
            'show-menu': this.state.showMenuVal,
            'hide-menu': !this.state.showMenuVal,
            'single_select': this.props.multi === false
        });

        const displayMenuArrow = cn({
            'display-menu-arrow': true,
            'open': this.state.showMenuVal,
        });

        const filterClasses = cn({
            'filters': true,
            'disabled': this.props.disabled,
            'alc-filters': true
        });

        const selectedFilterItems = cn({
            'filterLabel': true,
            'selectedFilterItems': !!value && value.length > 0
        });

        return (
            <div className={classname}>
                <span className={selectedFilterItems} >{label}</span>
                <div className={filterClasses} ref={(element) => { this.displayMenu = element }}>
                    <div className="Select-control" onClick={this.showMenu}>
                        <div className="selectedItems Select-multi-value-wrapper">
                            <div id={this.props.id && this.props.id} className="displaySelectedField">
                                {/* {this.props.value.length > 0 ? this.props.value.map(ac => ac[valueKey]).join(', ') : placeholder} */}
                                {this.props.value.length > 0 ? this.props.value.map(ac => {
                                    if(this.props.filterName === 'department') 
                                    {
                                         return ac[valueKey] && ac[valueKey].split('-')[0];
                                    }else if(this.props.filterName === 'majorClass'){
                                        return ac[valueKey] && ac[valueKey].split('-')[1];
                                    }else if(this.props.filterName === 'subClass'){
                                        return ac[valueKey] && ac[valueKey].split('-')[2];
                                    }
                                }).join(', ') : placeholder}                                    
                            </div>
                        </div>
                        {
                            this.props.selectedItem != false &&
                            <span className="selectedItemsNumber">
                                {!!value && value.length > 0 ? value[0].displayDesc === "All" ? (value.length - 1) : value.length : ""}
                            </span>
                        }
                        <span className="Select-arrow-zone" >
                            <span className={displayMenuArrow}></span>
                        </span>
                    </div>
                    <div className={displayMenuClasses} >
                        {
                            !!onClassDropdownClick && !!options && options.length === 0 ?
                                <div className="Select-placeholder" ref={input => { this.searchInput = input }}>Loading...</div> :
                                <div>
                                    <input
                                        ref={input => { this.searchInput = input }}
                                        className="Select-placeholder"
                                        onChange={this.onChangeFilter}
                                        type="text"
                                        placeholder="Search..."
                                        disabled={this.props.disabled}
                                        value={this.state.filterValue}
                                        id={this.props.id + "update"}
                                    />
                                    <i className="Select-placeholder-icon fa fa-search"></i>
                                </div>
                        }
                        {this.generateOptions()}
                    </div>
                </div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        const options = this.getOptions(nextProps.options);
        this.setState({ filterValue: nextProps.clearForm ? "" : this.state.filterValue, hasMore: true, selectedValues: nextProps.value, items: options })
    }

    generateOptions() {

        const valueKey = this.props.valueKey;
        const isChecked = item => this.state.selectedValues.find(p => {
            return p.isChecked && p[valueKey] === item[valueKey]
        });

        return <React.Fragment>

            {Array.isArray(this.getOptions(this.props.options)) && this.getOptions(this.props.options).map((item) => (
                <div className="checkbox-val" key={item[valueKey]}>
                    <label className="checkbox-label" >
                        {
                            this.props.multi === false ? <input
                                type="radio"
                                className="checkbox-input"
                                name={item[valueKey]}
                                checked={isChecked(item)}
                                onChange={event => this.onValueChange(event, item)}
                            /> :
                                <input
                                    type="checkbox"
                                    className="checkbox-input"
                                    name={item[valueKey]}
                                    checked={isChecked(item)}
                                    onChange={event => this.onValueChange(event, item)}
                                />
                        }
                        {this.props.filterName === 'department' && <span className="checkbox-label">{item[valueKey].split('-')[0]}</span>}
                        {this.props.filterName === 'majorClass' && <span className="checkbox-label">{item[valueKey].split('-')[1]}</span>}
                        {this.props.filterName === 'subClass' && <span className="checkbox-label">{item[valueKey].split('-')[2]}</span>}
                        {/* <span className="checkbox-label" onClick={event => this.onValueChange({ target: { checked: isChecked(item) ? false : true } }, item)}>
                            {item[valueKey]}
                        </span> */}
                    </label>
                </div>
            ))}

        </React.Fragment>
    }
}
