import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import styles from './eventcreatebutton.module.scss'
const CustomLink = ({ title, to }) => {
  return (
    <NavLink to={'/create-event'} className={styles.button} ><span>{ title }</span></NavLink>
  )
}

export default CustomLink