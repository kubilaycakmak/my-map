import React from 'react'
import { Select } from 'react-rainbow-components';
import "./selectinput.scss"
const SelectInput = ({label}) => {
    const options = [
        { value: 'NFT', label: 'NFT', color:"#219653" },
        { value: 'PROMO', label: 'Promo', color:"#006DFF" },
    ];

  return (
    <Select
        label={label}
        options={options}
        id="example-select-1"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
    ></Select>
  )
}

export default SelectInput