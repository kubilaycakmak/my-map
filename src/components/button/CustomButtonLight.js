import React from 'react'
import styles from './custombuttonlight.module.scss'

const CustomButtonLight = ({label, option, callback}) => {

    const onClickHandle = () => {
        callback(label);
    }
  return (
    <button onClick={onClickHandle} className={option == label ? styles.active : styles.customButtonLight}>{label}</button>
  )
}

export default CustomButtonLight