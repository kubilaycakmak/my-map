import React from 'react'
import { Select } from 'react-rainbow-components';
import "./selectinput.scss"
const SelectInput = ({label, getType, error}) => {
    const options = [
        { value: 'PROMO', label: 'Promo', color:"#006DFF" },
        { value: 'FNFT', label: 'F-NFT', color:"#F2C94C" },
        { value: 'NFT', label: 'NFT', color:"#219653" },
        
    ];
  return (
    <Select
        label={label}
        options={options}
        onChange={getType}
        id="example-select-1"
        className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
    >
    </Select>
  )
}

export default SelectInput