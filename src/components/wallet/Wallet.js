import React, { useState } from 'react'
import Metamask from '../meta/Metamask'
import NFTTable from './NFTTable'
import styles from './wallet.module.scss'

const Wallet = ({ onChangeValue, type }) => {

  const [wallet, setWallet] = useState(null);

  const getWalletAddress = (data) => {
    setWallet(data);
  }

  return (
    <>
      <h3>Select Wallet</h3>
      <div className={styles.wallet}>
        <Metamask onChangeHandler={getWalletAddress} />
      </div>
      
       {wallet ? 
       <>
          <h3>Select NFTs <span className={styles.networkName}>{type == "NFT" ? "- Ethereum Mainnet" : "- Rinkeby Test Network"}</span></h3>
          <NFTTable callback={onChangeValue} wallet={wallet} typeNFT={type} />
       </> : ""}
    </>
    
  )
}

export default Wallet