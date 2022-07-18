import React, { useState, useEffect } from 'react'
import styles from './defaultinput.module.scss'
const DefaultInput = ({ label, placeholder, type, disable, onChangeValue, required, error, maxWidth  }) => {

  return (
    <div className={styles.inputOuter}>
        <label htmlFor="custom-input" style={error && error.includes(label) ? {color: "red"} : {color: "#3C3C3C"}}>{label}</label>

        {type == "description" ? 
        <textarea required={required} onChange={onChangeValue} name="custom-input" placeholder={placeholder} disable={disable}></textarea>
            :
        <input style={maxWidth && {width: maxWidth}} required={required} onChange={onChangeValue} disabled={disable} name="custom-input" placeholder={placeholder}></input>
        }
        

    </div>  
  )
}

export default DefaultInput