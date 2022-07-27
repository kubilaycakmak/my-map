import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setWalletAddress } from '../../actions/user';
import './Metamask.css';
import styles from '../wallet/wallet.module.scss'

const Metamask = ({ onChangeHandler }) => {
  // set states to hold wallet account details
  const [userAccount, setUserAccount] = useState(null);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let eth;

  if (window){
    eth = window.ethereum

    window.ethereum.on('accountsChanged', async (metamask = eth) => {
      setUserAccount(metamask[0])
      onChangeHandler(metamask[0])
  });
  }else{
    alert("Please install metamask extension!")
  }



  const connectWallet =  async (metamask = eth)=>{
    try {
      // check if metamask is installed
      if(!metamask){
        return alert('please install metamask to proceed')
      }
      // access the account
      const acc = await metamask.request({ method: 'wallet_requestPermissions',
      params: [{
        eth_accounts: {},
      }]})
      if (acc.length){
        console.log(acc);
        setUserAccount(acc[0].caveats[0].value[0])
        onChangeHandler(acc[0].caveats[0].value[0])
        dispatch(setWalletAddress(currentUser.email, acc[0].caveats[0].value[0]));
      }
    } catch (error) {
      setUserAccount(null)
      onChangeHandler(null)
      console.log(error);
      throw new Error('No ethereum object found')
    }
  }

  const checkWalletConnect = async (metamask =eth)=>{
    try {
      // check if metamask is installed
      if(!metamask){
        return alert('please install metamask to continue')
      }
      const acc = await metamask.request({method: 'eth_accounts'})
      if (acc.length){

        if(typeof(acc[0].caveats) != "undefined"){
          setUserAccount(acc[0].caveats[0].value[0])
          onChangeHandler(acc[0].caveats[0].value[0])
        }else{
          setUserAccount(acc[0])
          onChangeHandler(acc[0])
        }
        
      }
    } catch (error) {
      console.log(error);
      setUserAccount(null)
      onChangeHandler(null)
      throw new Error('No Ethereum object')
    }
  }


  useEffect(()=>{
    checkWalletConnect()
  },[])

  return (
    <>
      <img className={styles.walletImage} src={require('../wallet/metamask.png')} />
        <div className={styles.walletBody}>
            <div className={styles.walletName}>Metamask Wallet</div>
            { userAccount ? 
              <div className={styles.walletConnect}>
                <div className={styles.walletAddress}>{userAccount}</div>
                <button className={styles.changeButton} onClick={() => connectWallet()}>Change wallet</button>
              </div>
              : <button href='#' className={styles.connectButton} onClick={() => connectWallet()}>Connect your wallet</button>
            }
      </div>
    </>
  )
}

export default Metamask