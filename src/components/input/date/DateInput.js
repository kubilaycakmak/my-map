import React, { useState } from 'react'
import { Picklist, PicklistOption, DatePicker } from 'react-rainbow-components';
import './dateinput.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const DateInput = ({label}) => {
    const [value, setValue] = useState({
        date: new Date('2019-10-25 10:44'),
        locale: { name: 'en-US', label: 'English (US)' },
    });
    
    const containerStyles = {
        maxWidth: 400,
    };

  return (
    <div
            className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
            style={containerStyles}
        >
            <DatePicker
                value={value.date}
                onChange={value => setValue({ date: value })}
                label={label}
                locale={value.locale.name}
                icon={<FontAwesomeIcon icon={faCalendar} />}
            />
        </div>
  )
}

export default DateInput