import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import CustomButton from '../button/CustomButton'
import styles from './eventbottomnavigation.module.scss'
const EventBottomNavigation = ({step, callback}) => {

  return (
    <div className={styles.bottomNavigation}>
        <div className={styles.bottomNavigationOuter}>
            <NavLink to={"/event"}>Discard</NavLink>
            <CustomButton onClick={callback} step={step} title={step == 3 ? "Publish" : "Next"} to="" />
        </div>
    </div>
  )
}

export default EventBottomNavigation