import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import VirtualizedSelect from 'react-virtualized-select'; 
import './Picker.scss'

export default class Picker extends Component {
  render() {
    const { 
            onChange,
            options, 
            placeholder, 
            value, 
            labelKey, 
            valueKey, 
            filterOptions,
            label,
            multi,
            classname,
            disabled,
            clearable
           } = this.props;
    return (  
      <div className={classname}>
        <span 
        style={{fontWeight: 700, fontSize: '1.2rem'}}
        >{label}</span>      
        <VirtualizedSelect
          options={options}
          filterOptions={filterOptions}
          labelKey={labelKey}
          valueKey={valueKey} 
          placeholder={placeholder}
          value={value}
          onChange={value => onChange(value)}
          clearable={false}      
          className='select'
          multi={multi}
          clearable={clearable}
          disabled={disabled}
        />
      </div>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,  
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  filterOptions: PropTypes.func,
  label: PropTypes.string, 
  multi: PropTypes.bool.isRequired,
  classname: PropTypes.string,
  disabled: PropTypes.bool,
}
