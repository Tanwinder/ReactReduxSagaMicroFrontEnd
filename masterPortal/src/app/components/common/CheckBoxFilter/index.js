import React, { PureComponent } from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';
import './CheckBoxFilter.scss';
import cn from 'classnames';
import _ from 'lodash';

const CheckboxOption = ({value, isChecked, onChange}) => {
    return (
        <div className="checkbox-val">
        <label>
          <input
            type="checkbox"
            className="checkbox-input"
            name={value}
            checked={isChecked}
            onChange={onChange}
          />
          <span className="checkbox-label">
            {value}
          </span>
        </label>
        </div>
      );
}

class CheckboxFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showMenuVal: false,
            filterValue: '',
            val: false
        }
    }
    showMenu = (event) => {
        event.preventDefault();
        if(this.props.disabled === true) {
            return;
        }
        if(!!this.props.onClassDropdownClick && !this.state.showMenuVal && !!this.props.deptSelectionChanged) {
            this.props.onClassDropdownClick();
        }
        
        this.setState({ 
            showMenuVal: event.target.classList && event.target.classList[0] && event.target.classList[0].indexOf("Select-placeholder") && event.target.classList[0].indexOf("Select-placeholder") !== -1 ? 
            true : 
            !this.state.showMenuVal 
        }, 
        () => {
            this.searchInput.focus();
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu = (event) => {
        if( !!this.displayMenu 
            && !this.displayMenu.contains(event.target) 
            && event.target.classList && event.target.classList[0] && event.target.classList[0].indexOf("Select-placeholder") && !event.target.classList[0].indexOf("Select-placeholder") !== -1) {

            this.setState({
                showMenuVal: false 
            }, 
            () => {
                document.removeEventListener('click', this.closeMenu);
            });
        }
    }
    onChangeFilter = (e) => {
        this.setState({
            filterValue: e.target.value
        })
    }
    onValueChange = (event, item) => {
        const { name, checked} = event.target;
        let newItem = {
            ...item,
            isChecked: checked
        }
        this.props.onChange(newItem);
    }
   
    getOptions = (options) => {
        if( !!this.state.filterValue ) {
            return options.filter(ac => ac[this.props.valueKey].toLowerCase().indexOf(this.state.filterValue) !== -1);
        }
        return options;
    }
    render() {
        
        const { options,
            label,
            classname, 
            valueKey, 
            labelKey, 
            placeholder,
            value,
            onClassDropdownClick } = this.props;
        const getOptions = this.getOptions(options);
        const displayMenuClasses = cn({
            'menu-display': true,
            'checkbox-filter': true,
            'show-menu': this.state.showMenuVal,
            'hide-menu': !this.state.showMenuVal
          });
        const displayMenuArrow = cn({
            'display-menu-arrow': true,
            'open': this.state.showMenuVal,
        });
        const filterClasses = cn({
            'filters': true,
            'disabled': this.props.disabled
        })
        const selectedFilterItems = cn({
            'filterLabel': true,
            'selectedFilterItems': !!value && value.length > 0
        })
        return(
            <div className={classname}>
                <span className={selectedFilterItems} style={{fontWeight: (this.props.disabled ? '300': '')}} >{label}</span>  
                <div className={filterClasses} ref={(element) => {this.displayMenu = element}}>
                    <div className="Select-control" style={{cursor: (this.props.disabled ? 'not-allowed': '')}} onClick={this.showMenu}>
                        <div className="selectedItems Select-multi-value-wrapper">
                                <div className="displaySelectedField">{ !!value && value.length> 0 ? value.map(ac => ac[valueKey]).join(', ') : placeholder}</div>
                        </div>
                        <span className="selectedItemsNumber">
                        {!!value && value.length > 0 ? value.length : ""}
                        </span>
                        <span className="Select-arrow-zone" >
                            <span className={displayMenuArrow}></span>
                        </span>
                    </div>
                    <div className={displayMenuClasses} >
                        {
                            !!onClassDropdownClick && !!getOptions && getOptions.length == 0 ?
                            <div
                            className="Select-placeholder"
                            ref={ input => { this.searchInput = input}}
                            >Loading...</div>
                            :
                            !!getOptions &&
                            <div>
                                <input
                                ref={ input => { this.searchInput = input}}
                                className="Select-placeholder"
                                onChange={this.onChangeFilter} 
                                type="text" 
                                placeholder="Search..."
                                disabled={this.props.disabled} 
                                value={this.state.filterValue}/>
                                <i className="Select-placeholder-icon fa fa-search"></i>
                            </div>
                        }
                        { getOptions.map( item => 
                            <CheckboxOption
                                isChecked={!!item.isChecked ? true : false}
                                key={item[labelKey]}
                                value={item[valueKey]}
                                onChange={ event => this.onValueChange(event, item)} 
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

CheckboxFilter.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    valueKey: PropTypes.string.isRequired,
    labelKey: PropTypes.string.isRequired,
    value: PropTypes.array,
    onClassDropdownClick: PropTypes.func,
    deptSelectionChanged: PropTypes.bool
}
export default CheckboxFilter;