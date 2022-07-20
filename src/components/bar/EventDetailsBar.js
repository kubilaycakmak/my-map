import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './eventdetailsbar.module.scss'

const EventDetailsBar = ({step}) => {

  const [width, setWidth ] = useState();


  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setWidth(width)
  }, [width])
  

  return (
    <div className={styles.bar}>
        { width >= 768 ? <NavLink to={"/event"}> Back to Events</NavLink> : <NavLink to={"/event"}> Back</NavLink> }

        <div className={styles.steps}>
          {
            width >= 768 ?

            <>
              <div className={step == 0 ? styles.active : styles.disable}>Event Details</div>
              <div className={step == 1 ? styles.active : styles.disable}>Distribution Options</div>
              <div className={step == 2 ? styles.active : styles.disable}>Rewards</div>
              <div className={step == 3 ? styles.active : styles.disable}>Review & Publish</div>
            </>
            :
            <>
              <div className={step == 0 || step > 0 ? styles.activeMobile : styles.disableMobile}>{step == 0 ? 1 : "👍🏼"}</div>
              <div className={step > 0 ? styles.activeMobile : styles.disableMobile}>{step > 1 ? "👍🏼" : 2}</div>
              <div className={step > 1 ? styles.activeMobile : styles.disableMobile}>{step > 2 ? "👍🏼" : 3}</div>
              <div className={step > 2 ? styles.activeMobile : styles.disableMobile}>{step > 3 ? "👍🏼" : 4}</div>
            </>
          }
            
        </div>
    </div>
  )
}

export default EventDetailsBar