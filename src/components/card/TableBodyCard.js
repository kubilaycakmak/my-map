import React from 'react'
import styles from './styles/tablebodycard.module.scss'
import moment from 'moment'

const TableBodyCard = ({ img, date, name, address}) => {
  return (
    <div className={styles.tableBody}>
      <div className={styles.tableBodyDate}>
        <span>{moment.unix(date).format('MMMM')}</span>
        <span>{moment.unix(date).format('DD')}</span>
      </div>
      <div className={styles.tableBodyDescription}>
        <img src={img}/>
        <div className={styles.tableBodyDescriptionDetails}>
          <p>{moment.unix(date).format("dddd, MMMM DD, YYYY")} AT {moment.unix(date).format("hh:mm A")}</p>
          <h4>{name}</h4>
          <p>{address}</p>
        </div>
      </div>
    </div>
  )
}

export default TableBodyCard