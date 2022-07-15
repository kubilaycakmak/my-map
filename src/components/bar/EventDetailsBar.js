import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './eventdetailsbar.module.scss'

const EventDetailsBar = ({step}) => {

  return (
    <div className={styles.bar}>
        <NavLink to={"/event"}> Back to Events</NavLink>

        <div className={styles.steps}>
            <div className={step == 0 ? styles.active : styles.disable}>Event Details</div>
            <div className={step == 1 ? styles.active : styles.disable}>Distribution Options</div>
            <div className={step == 2 ? styles.active : styles.disable}>Rewards</div>
            <div className={step == 3 ? styles.active : styles.disable}>Review & Publish</div>
        </div>
    </div>
  )
}

export default EventDetailsBar