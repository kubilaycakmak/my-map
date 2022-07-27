import React, { useEffect } from 'react'
import CustomLink from '../components/button/event/CustomLink'
import EventTable from '../components/table/EventTable'
import styles from "./styles/event.module.scss"
import SideBar from '../components/bar/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { getOwnEventPoint } from '../actions/point'
import { Redirect } from 'react-router-dom'

const Event = () => {

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { point: currentPoints } = useSelector((state) => state);
  const { isLoggedIn } = useSelector(state => state.auth);
  useEffect(() => {
    if(currentUser){
      dispatch(getOwnEventPoint(currentUser.fullName))
    }
    console.log(currentPoints.points);
  }, [])

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  
  return (
    <div className={styles.event}>
      <SideBar />
      <div className={styles.eventOutter}>
        {
          currentPoints.points ? currentPoints.points.length != 0 ?

          <div className={styles.header}>
            <h1>Events</h1>
            <CustomLink title="Create event" to="/create-event"/>
          </div>
          :
          ""
          :
          ""
        }
        
        <div className={styles.body}>
          {currentPoints.points ? currentPoints.points.length != 0 ? <EventTable events={currentPoints.points ? currentPoints.points : []} /> : 
          <>
            <div className={styles.noEvent}>
              <img src={require("./noEvent.png")} />
              <h3>Lets start to create first event</h3>
              <CustomLink title="Create event" to="/create-event"/>
            </div>
          </> : 
           ""
          }
        </div>
      </div>
    </div>
  )
}

export default Event