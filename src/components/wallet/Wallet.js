import React from 'react'
import styles from './wallet.module.scss'

const Wallet = ({walletAddress = "1BoatSLRHtKNngkdXEeobR76b53LETtpyT"}) => {
  return (
    <div className={styles.wallet}>
        <img className={styles.walletImage} src={require('./metamask.png')} />
        <div className={styles.walletBody}>
            <div className={styles.walletName}>Metamask Wallet</div>
            <div className={styles.walletAddress}>{walletAddress}</div>
        </div>
    </div>
  )
}

export default Wallet