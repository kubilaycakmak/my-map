import React from 'react'
import styles from './eventtable.module.scss'
import Table from 'react-bootstrap/Table';
import TableBodyCard from '../card/TableBodyCard'
import TableRewardsCard from '../card/TableRewardsCard'
import TableCreatedAtCard from '../card/TableCreatedAtCard'
import TableStatusCard from '../card/TableStatusCard'

const EventTable = ({ events }) => {
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
                <td className={styles.tdContent}><TableBodyCard img={item.detail.image} name={item.title} date={item.startDateTS} address={item.address}/></td>
                <td className={styles.tdContent}><TableRewardsCard type={item.type}/></td>
                <td className={styles.tdContent}><TableCreatedAtCard date={item.createdAt}/></td>
                <td className={styles.tdContent}><TableStatusCard status={item.status}/></td>
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