import React from 'react'
import styles from './styles/tablecreatedatcard.module.scss'
import moment from 'moment'

const TableCreatedAtCard = ({date}) => {
  console.log(date);
  return (
    <p className={styles.createdDate}>{moment(date).format("LLL")}</p>
  )
}

export default TableCreatedAtCard