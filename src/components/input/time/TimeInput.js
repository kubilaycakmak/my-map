import React, { useState } from 'react'
import { TimePicker } from 'react-rainbow-components';
import './timeinput.scss'
const TimeInput = ({label}) => {

    const [value, setValue] = useState({
        time: "13:32",
    });
    
    const containerStyles = {
        maxWidth: 400,
    };

  return (
    <div
            className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
            style={containerStyles}
        >
            <TimePicker
                id="time-picker-1"
                value={value.time}
                label={label}
                onChange={value => setValue({ time: value })}
                style={containerStyles}
                className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
            />
        </div>
  )
}

export default TimeInput