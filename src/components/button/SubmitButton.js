import React from 'react'
import styles from './submitbutton.module.scss'
const SubmitButton = ({text}) => {
  return (
    <button className={styles.submitButton}>{text}</button>
  )
}

export default SubmitButton