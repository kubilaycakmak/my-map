import React from 'react'

import { NavLink } from 'react-router-dom'
import styles from './eventsuccess.module.scss'

const EventFailed = () => {
  return (
    <div className={styles.eventSuccess}>
        <img src={require("./fail.png")} />
        <h1>Your event has failed while publishing.</h1>
        <p>Maecenas justo turpis, tristique quis nibh id, blandit pellentesque tortor. Nullam eu facilisis velit. </p>
        
        <div className={styles.eventAction}>
          <NavLink to={"/event"} >Back to Home</NavLink>
          {/* <button>Share</button> */}
        </div>
    </div>
  )
}

export default EventFailed