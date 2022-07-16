import React, { useState } from 'react'
import { Picklist, PicklistOption, DatePicker } from 'react-rainbow-components';
import './dateinput.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const DateInput = ({label, getDate}) => {
    const [value, setValue] = useState({
        date: new Date('2019-10-25 10:44')
    });
    
    const containerStyles = {
        maxWidth: 400,
    };

    const getDateFromInput = (value) => {
        getDate(value)
        setValue({date: value})
    }

  return (
    <div
            className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
            style={containerStyles}
        >
            <DatePicker
                value={value.date}
                onChange={getDateFromInput}
                label={label}
                locale={"en-US"}
                icon={<FontAwesomeIcon icon={faCalendar} />}
            />
        </div>
  )
}

export default DateInput