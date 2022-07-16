import React from 'react'
import styles from './styles/tablestatuscard.module.scss'

const TableStatusCard = ({status}) => {
  return (
    <p className={styles.statusInformation}><span className={status == "Published" ? styles.actived : status == "Inactive" ? styles.inactived : styles.draft}></span>{status}</p>
  )
}

export default TableStatusCard