import React from 'react'
import styles from './styles/tablerewardscard.module.scss'

const TableRewardsCard = ({type}) => {
  return (
    <div className={styles.type}>
      <p>{type}</p>
    </div>
  )
}

export default TableRewardsCard