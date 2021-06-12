import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment'
import 'bootstrap-daterangepicker/daterangepicker.css';

const CURRENT_DATE = moment(new Date()).add(1, 'days');

class SingleDateRangePickerWithPastDates extends Component {

        applyDateChange = (event, picker) => {
          this.props.onDateSelect(event, picker.startDate, this.props.data);
        }
      
        render() {
          return(
            <div
              className={this.props.className}
              style={this.props.style}
              title={this.props.content}
            >
              <div>{this.props.content}
                <DateRangePicker
                  singleDatePicker={true}
                  maxDate={CURRENT_DATE}
                  startDate={CURRENT_DATE}
                  showDropdowns={true}
                  autoApply={true}
                  onApply={this.applyDateChange}
                >
                  <i
                    className="fa fa-calendar"
                    aria-hidden="true"
                    style={{fontSize:'14px',float:'right',textAlign:'right'}}
                  />
                </DateRangePicker>
                </div>
            </div>
          );
        }
      };

export default SingleDateRangePickerWithPastDates