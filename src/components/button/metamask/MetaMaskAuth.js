import React from 'react'
import { useMoralis } from "react-moralis";
import eventBus from '../../../common/EventBus'

const MetaMaskAuth = ({text}) => {
  const { authenticate, isAuthenticated, user } = useMoralis();

  const styles = {
    height: "48px",
    width: "100%",
    background: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins",
    marginTop:"24px"
  }

  const metamaskStyles = {
    width: "28px",
    height: "28px",
    marginBottom: "0",
    marginLeft: "12px"
  }

  let eth

  if (typeof window !== 'undefined'){
    eth = window.ethereum
  }

  const checkAccount =  async (metamask = eth) => {
    try {
      // check if metamask is installed
      if(!metamask){
        return alert('please install metamask to proceed')
      }
      // access the account
      const acc = await metamask.request({method:'eth_accounts'})
      console.log(acc);
      return acc;
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object found')
    }
  }

  const login = async () => {
    await authenticate()
      .then(function (user) {
        console.log(user);
        eventBus.dispatch("ask-info", user);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <button style={styles} onClick={() => login()}>Sing {text} with Metamask <span><img style={metamaskStyles} src={require("./metamask.png")}/></span></button>
  )
}

export default MetaMaskAuth