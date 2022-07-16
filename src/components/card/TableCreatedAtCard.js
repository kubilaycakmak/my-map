import React from 'react'
import styles from './styles/tablecreatedatcard.module.scss'
import moment from 'moment'

const TableCreatedAtCard = ({date}) => {
  return (
    <p className={styles.createdDate}>{moment.unix(date).format("MMMM DD, YYYY")}</p>
  )
}

export default TableCreatedAtCard