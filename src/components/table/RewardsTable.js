import React from 'react'
import styles from './eventtable.module.scss'
import Table from 'react-bootstrap/Table';

const RewardsTable = ({ rewards, cover }) => {
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
          rewards 
          ? 
          <tr className={styles.tr}>
                <td>{ rewards.detail ? <img src={rewards.type == "PROMO" ? cover.preview : cover}/> : "" } <span>{rewards.type}</span></td>
                { rewards.type == "PROMO" && rewards.detail ? <td>{rewards.detail.download_url}</td> : ""}
                { rewards.type == "NFT" || rewards.type == "FNFT" && rewards.detail ? <td>{rewards.detail.name}</td> : ""}
              </tr>
          : ""
        }
      </tbody>
    </Table>
  )
}

export default RewardsTable