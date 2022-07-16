import React from 'react'
import styles from './styles/tablerewardscard.module.scss'

const TableRewardsCard = ({type}) => {
  return (
    <div style={{background: type == "PROMO" ? "#006DFF" : type == "NFT" ? "#219653" : "#F2C94C"}} className={styles.type}>
      <p>{type == "PROMO" ? "Promo" : type}</p>
    </div>
  )
}

export default TableRewardsCard