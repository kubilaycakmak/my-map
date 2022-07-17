import React from 'react'
import SideBar from '../components/bar/SideBar'
import styles from './styles/wallet.module.scss'
const Wallet = () => {
  return (
    <div className={styles.walletPage}>
       <div><SideBar /></div>
       <div className={styles.walletPageBody}>
        Wallet
       </div>
    </div>
  )
}

export default Wallet