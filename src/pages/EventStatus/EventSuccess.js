import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './eventsuccess.module.scss'

const EventSuccess = () => {
  return (
    <div className={styles.eventSuccess}>
        <img src={require("./success.png")} />
        <h1>Your event has been successfully published</h1>
        <p>Maecenas justo turpis, tristique quis nibh id, blandit pellentesque tortor. Nullam eu facilisis velit. </p>
        
        <div className={styles.eventAction}>
          <NavLink to={"/event"} >Back to Home</NavLink>
          <button>Share</button>
        </div>
    </div>
  )
}

export default EventSuccess