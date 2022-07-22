import moment from 'moment';
import React, { useState } from 'react'
import { TimePicker } from 'react-rainbow-components';
import './timeinput.scss'
const TimeInput = ({label, getHour, error, endTime}) => {

    const [value, setValue] = useState({
        time: endTime ? moment().add(1, "hour").format("HH:mm") : moment().format("HH:mm")
        // "13:32",
    });
    
    const containerStyles = {
        maxWidth: 400,
    };

    const getHourFromInput = (value) => {
        getHour(value);
        setValue({ time: value })
    }

  return (
    <div
            className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
            style={containerStyles}
        >
            <TimePicker
                error={error.includes(label) ? "Please select time" : ""}
                id="time-picker-1"
                value={value.time}
                label={label}
                onChange={getHourFromInput}
                style={containerStyles}
                className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
            />
        </div>
  )
}

export default TimeInput