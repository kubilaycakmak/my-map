import React from 'react'
import styles from './styles/tablestatuscard.module.scss'

const TableStatusCard = ({status}) => {
  return (
    <p className={styles.statusInformation}>{status}</p>
  )
}

export default TableStatusCard