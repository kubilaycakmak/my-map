import React, { useEffect } from 'react'
import CustomLink from '../components/button/event/CustomLink'
import EventTable from '../components/table/EventTable'
import styles from "./styles/event.module.scss"
import SideBar from '../components/bar/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { getOwnEventPoint } from '../actions/point'

const Event = () => {

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { point: currentPoints } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getOwnEventPoint(currentUser.username))
    console.log(currentPoints.points);
  }, [])
  
  return (
    <div className={styles.event}>
      <SideBar />
      <div className={styles.eventOutter}>
        <div className={styles.header}>
          <h1>Events</h1>
          <CustomLink title="Create event" to="/create-event"/>
        </div>
        <div className={styles.body}>
          {currentPoints.points ? <EventTable events={currentPoints.points ? currentPoints.points : []} /> : "" }
        </div>
      </div>
    </div>
  )
}

export default Event