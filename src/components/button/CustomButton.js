import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import styles from './custombutton.module.scss'
const CustomButton = ({ title, step, onClick }) => {
  
  const onButtonPress = () => {
    if(step != 3){
        onClick(step + 1)
    }
    
  }
  return (
    <Button onClick={onButtonPress} className={styles.button} ><span>{ title }</span></Button>
  )
}

export default CustomButton