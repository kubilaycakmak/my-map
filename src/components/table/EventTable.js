import React from 'react'
import styles from './eventtable.module.scss'
import Table from 'react-bootstrap/Table';
import TableBodyCard from '../card/TableBodyCard'
import TableRewardsCard from '../card/TableRewardsCard'
import TableCreatedAtCard from '../card/TableCreatedAtCard'
import TableStatusCard from '../card/TableStatusCard'

const EventTable = ({ events }) => {
  console.log(events);
  return (
    <Table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>Event Details</th>
          <th className={styles.th}>Rewards</th>
          <th className={styles.th}>Created</th>
          <th className={styles.th}>Status</th>
          <th className={styles.th}></th>
        </tr>
      </thead>
      <tbody>
        {
          events.map((item, index) => {
            return (
              <tr key={index} className={styles.tr}>
                <td><TableBodyCard month={item.event_date.split(',')[1].split(" ")[1]} day={item.event_date.split(',')[1].split(" ")[2]} img={item.image} name={item.name} date={item.event_date} address={item.address}/></td>
                <td><TableRewardsCard type={item.type}/></td>
                <td><TableCreatedAtCard date={item.event_create_at}/></td>
                <td><TableStatusCard status={item.status}/></td>
                <td>..</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}

export default EventTable