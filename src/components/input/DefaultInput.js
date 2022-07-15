import React from 'react'
import styles from './defaultinput.module.scss'
const DefaultInput = ({ label, placeholder, type, disable }) => {
  return (
    <div className={styles.inputOuter}>
        <label htmlFor="custom-input">{label}</label>

        {type == "description" ? 
        <textarea  name="custom-input" placeholder={placeholder}></textarea>
            :
        <input disabled={disable} name="custom-input" placeholder={placeholder}></input>
        }
        

    </div>  
  )
}

export default DefaultInput