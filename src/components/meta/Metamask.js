import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setWalletAddress } from '../../actions/user';
import './Metamask.css';



const Metamask = () => {
  // set states to hold wallet account details
  const [userAccount, setUserAccount] = useState()
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let eth;

  if (typeof window !== 'undefined'){
    eth = window.ethereum
  }

  const connectWallet =  async (metamask = eth)=>{
    try {
      // check if metamask is installed
      if(!metamask){
        return alert('please install metamask to proceed')
      }
      // access the account
      const acc = await metamask.request({method:'eth_requestAccounts'})
      setUserAccount(acc[0])
      dispatch(setWalletAddress(currentUser.email, acc[0]));
      console.log('look here');
      window.location.reload()
    } catch (error) {
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
        setUserAccount(acc[0])
      }
    } catch (error) {
      console.log(error);
      throw new Error('No Ethereum object')
    }
  }

  useEffect(()=>{
    checkWalletConnect()
  },[])

  return (
    <>
      <div className='wrapper'>
        {/* <img src={img} alt="" /> */}
        <div className="connect">
          {
            userAccount ? <div className='text-connect'>
              <span>{userAccount.substring(0, 5)}...{userAccount.substring(userAccount.length - 5)} </span> 
            </div>  : <button className='btn' onClick={() => connectWallet()}>connect wallet</button>
          }
        </div>  
      </div>
    </>
  )
}

export default Metamask