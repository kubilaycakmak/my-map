import React from 'react'
import styles from './styles/tablebodycard.module.scss'

const TableBodyCard = ({ month, day, img, date, name, address}) => {
  return (
    <div className={styles.tableBody}>
      <div className={styles.tableBodyDate}>
        <span>{month}</span>
        <span>{day}</span>
      </div>
      <div className={styles.tableBodyDescription}>
        <img src={img}/>
        <div className={styles.tableBodyDescriptionDetails}>
          <p>{date}</p>
          <h4>{name}</h4>
          <p>{address}</p>
        </div>
      </div>
    </div>
  )
}

export default TableBodyCard