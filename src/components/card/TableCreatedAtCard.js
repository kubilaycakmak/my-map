import React from 'react'
import styles from './styles/tablecreatedatcard.module.scss'

const TableCreatedAtCard = ({date}) => {
  return (
    <p className={styles.createdDate}>{date}</p>
  )
}

export default TableCreatedAtCard