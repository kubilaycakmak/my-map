import React from 'react'
import styles from './eventtable.module.scss'
import Table from 'react-bootstrap/Table';
import TableBodyCard from '../card/TableBodyCard'
import TableRewardsCard from '../card/TableRewardsCard'
import TableCreatedAtCard from '../card/TableCreatedAtCard'
// import TableStatusCard from '../card/TableStatusCard'
import { useHistory } from "react-router-dom";
const EventTable = ({ events }) => {

  const history = useHistory();

  return (
    <Table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>Event Details</th>
          <th className={styles.th}>Rewards</th>
          <th className={styles.th}>Created</th>
          <th className={styles.th}>Status</th>
          {/* <th className={styles.th}></th> */}
        </tr>
      </thead>
      <tbody>
        { 
          events.map((item, index) => {
            return (
              <tr key={index} className={styles.tr} onClick={() => history.push(`/event-action?id=${item._id}`)}>
                <td className={styles.tdContent}><TableBodyCard img={item.detail?.image} name={item.title} date={item.startDateTS} address={item.address}/></td>
                <td className={styles.tdContent}><TableRewardsCard type={item.type}/></td>
                <td className={styles.tdContent}><TableCreatedAtCard date={item.createdAt}/></td>
                <td className={styles.tdContent}><p>{item.white_list.length} joined</p></td>
                {/* <td className={styles.tdContent}></td> */}
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}

export default EventTable