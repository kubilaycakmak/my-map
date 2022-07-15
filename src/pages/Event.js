import React from 'react'
import CustomLink from '../components/button/event/CustomLink'
import EventTable from '../components/table/EventTable'
import styles from "./styles/event.module.scss"
import SideBar from '../components/bar/SideBar'
const Event = () => {

  const events = [
    {
      id:'1',
      name:"Lorem ipsum dolor sit amet",
      event_date: "FRIDAY, JUNE 24, 2022 AT 1:00 PM PST",
      type:"nft",
      event_create_at: "March 5, 2022",
      status: "published",
      address: "1234 West 12st Ave, Vancouver, BC, VSX 9H9",
      image:"https://images.unsplash.com/photo-1643101807331-21a4a3f081d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
    },
    {
      id:'2',
      name:"Lorem ipsum dolor sit amet",
      event_date: "FRIDAY, JUNE 24, 2022 AT 1:00 PM PST",
      type:"nft",
      event_create_at: "March 5, 2022",
      status: "published",
      address: "1234 West 12st Ave, Vancouver, BC, VSX 9H9",
      image:"https://images.unsplash.com/photo-1643101807331-21a4a3f081d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
    },
    {
      id:'3',
      name:"Lorem ipsum dolor sit amet",
      event_date: "FRIDAY, JUNE 24, 2022 AT 1:00 PM PST",
      type:"nft",
      event_create_at: "March 5, 2022",
      status: "published",
      address: "1234 West 12st Ave, Vancouver, BC, VSX 9H9",
      image:"https://images.unsplash.com/photo-1643101807331-21a4a3f081d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
    }
  ]

  return (
    <div className={styles.event}>
      <SideBar />
      <div className={styles.eventOutter}>
        <div className={styles.header}>
          <h1>Events</h1>
          <CustomLink title="Create event" to="/create-event"/>
        </div>
        <div className={styles.body}>
          <EventTable events={events} />
        </div>
      </div>
    </div>
  )
}

export default Event