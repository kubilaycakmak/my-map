import React from 'react'
import styles from './eventtable.module.scss'
import Table from 'react-bootstrap/Table';

const RewardsTable = ({ rewards }) => {
  console.log(events);
  return (
    <Table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>Reward Type</th>
          <th className={styles.th}>Details</th>
        </tr>
      </thead>
      <tbody>
        {
          rewards.map((item, index) => {
            return (
              <tr key={index} className={styles.tr}>
                <td>{item.type}</td>
                <td>{item.details}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}

export default RewardsTable