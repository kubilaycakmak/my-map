import React, { useState } from 'react'
import styles from './defaultinput.module.scss'
const DefaultInput = ({ label, placeholder, type, disable, onChangeValue }) => {

  const [data, setData] = useState("");

  return (
    <div className={styles.inputOuter}>
        <label htmlFor="custom-input">{label}</label>

        {type == "description" ? 
        <textarea onChange={onChangeValue} name="custom-input" placeholder={placeholder} disable={disable}></textarea>
            :
        <input onChange={onChangeValue} disabled={disable} name="custom-input" placeholder={placeholder}></input>
        }
        

    </div>  
  )
}

export default DefaultInput