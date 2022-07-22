import React, { useEffect, useState } from 'react'
import SideBar from '../components/bar/SideBar'
import styles from './styles/status.module.scss'
import { useHistory } from "react-router-dom";
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { getPointById, updatePoint, updatePointFraction } from '../actions/point';
import WhiteListTable from '../components/table/WhiteListTable';
import Moralis from "moralis";
import moment from 'moment';
import { ethers, BigNumber } from 'ethers';
import NFTGenerator from '../json/NFTGenerator.json';
import MainContract from '../json/MainContract.json';
import DefaultInput from '../components/input/DefaultInput';
import { Slider } from 'react-rainbow-components';
const NFTGeneratorAddress = "0x5f45E99F6F83630b34c815C585742eac229B2285";
const NFTFractionaliseAddress = "0x0A414b4252b0d61E5801e82d5AD63fFBf99eda82";

const Status = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { point: currentPoints } = useSelector((state) => state);
  const { white_list, _id } = currentPoints.point || [];
  const [isContractApproved, setIsContractApproved] = useState(false);
  const [isDepositNFT, setIsDepositNFT] = useState(false);
  const [isFractionalize, setIsFractionalize] = useState(false);
  const [isFractionAddress, setIsFractionAddress] = useState(false);
  const [fractionId, setFractionId] = useState(5);
  const [fractionAddress, setFractionAddress] = useState();
  const [royalityValue, setRoyalityValue] = useState(0);

  const [fractionName, setFractionName] = useState();
  const [fractionSymbol, setFractionSymbol] = useState();
  const [fractionSupply, setFractionSupply] = useState();

  // Moralis.enableWeb3();

  useEffect(() => {
    if(history.location.search){
      const param = queryString.parse(history.location.search);
      dispatch(getPointById(param.id));
      }else{
        history.push("/event");
      }
    }, [])

  const senffnft = async (data) => {
    const { detail } = currentPoints.point || {};
    await Moralis.enableWeb3();
    const options = {
      type: "erc20",
      receiver: data,
      contractAddress: detail.token_address,
      tokenId: parseInt(detail.token_id),
      amount: Moralis.Units.Token(1, "18")
    };

    // let result = await Moralis.transfer(options);
    const pointData = {
      eventId: _id,
      wallet: data
    };
    await Moralis.transfer(options).then(()=> {
      dispatch(updatePoint(pointData))
      history.go()
    }).catch(e => {
      console.log(e);
    })
  }
  const handleSendGift = async (data) => {

    const { detail } = currentPoints.point || {};
    console.log(detail);
    await Moralis.enableWeb3();
    const options = {
      type: detail.contract_type.toLowerCase(),
      receiver: data,
      contractAddress: detail.token_address,
      tokenId: parseInt(detail.token_id),
    };
      
    // // let result = await Moralis.transfer(options);
    const pointData = {
      eventId: _id,
      wallet: data
    };
    await Moralis.transfer(options).then(()=> {
      dispatch(updatePoint(pointData))
      history.go()
    }).catch(e => {
      console.log(e);
    })
  }

  async function handleApproveMainContract() {
      if(window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
              NFTGeneratorAddress,
              NFTGenerator.abi,
              signer
          );
          try {
              const response = await contract.approve(NFTFractionaliseAddress, currentPoints.point.detail.token_id);
              console.log('response: ', response);
              setIsContractApproved(true)
          } catch (err) {
              console.log("error", err);
          }
      }
  }

  async function handleDepositNFT() {
    console.log('ad');
      if(window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
              NFTFractionaliseAddress,
              MainContract.abi,
              signer
          );
          try {
              const response = await contract.depositNft(NFTGeneratorAddress, currentPoints.point.detail.token_id);
              console.log('response: ', response);
              setIsDepositNFT(true);
          } catch (err) {
              console.log("error", err);
          }
      }
  }

  async function handleFractionNft() {
      if(window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
              NFTFractionaliseAddress,
              MainContract.abi,
              signer
          );
          try {

            console.log(currentPoints.point.detail.token_address,
              currentPoints.point.detail.token_id,
              BigNumber.from(royalityValue),
              BigNumber.from(fractionSupply + "000000000000000000"),
              fractionName.toString(),
              fractionSymbol.toString()
              );

              console.log(currentPoints.point.detail);
              
              // contractAddress,
              // BigNumber.from(nftId),
              // BigNumber.from(royalty),
              // BigNumber.from(supply),
              // tokenName.toString(),
              // tokenTicker.toString());

              const response = await contract.createFraction(currentPoints.point.detail.token_address,
                                                            currentPoints.point.detail.token_id,
                                                            BigNumber.from(royalityValue),
                                                            BigNumber.from(fractionSupply + "000000000000000000"),
                                                            fractionName.toString(),
                                                            fractionSymbol.toString()
                                                            );
              console.log('response: ', response);
              setIsFractionalize(true);
          } catch (err) {
              console.log("error", err);
          }

          try {
              const responseFractionID = await contract.getLastFractionId(currentPoints.point.detail.owner_of) - 1;
              // setFractionId(responseFractionID)
              // setFractionIdStill(responseFractionID)
              console.log('response: ', responseFractionID);
              setFractionId(responseFractionID);
              // call function here
              // dispatch(updatePoint())
              
          } catch (err) {
              console.log("error", err);
              console.log("address: ", currentPoints.point.detail.owner_of)
          }
      }
  }

  async function getFractionContractAddress() {
      if(window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
              NFTFractionaliseAddress,
              MainContract.abi,
              signer
          );
          try {
              const response = await contract.getFractionContractAddress(currentPoints.point.detail.owner_of, fractionId);
              setFractionAddress(response)
              // setWithdrawFractionAddress(response)
              setIsFractionAddress(true)
              console.log('response: ', response);
              dispatch(updatePointFraction({id: currentPoints.point._id, fractionAddress: response}));
          } catch (err) {
              //console.log("error", err);
              console.log("accounts[0]: " + currentPoints.point.detail.owner_of)
              console.log("fractionId: " + fractionId)
          }
      }
  }

  async function getTokens(){
    await Moralis.enableWeb3();
    const options = {
      type: "erc20",
      amount: Moralis.Units.Token("white_list.length", "18"),
      receiver: currentPoints.point.detail.owner_of,
      contractAddress: currentPoints.point.detail.token_address,
    };

    let result = await Moralis.transfer(options);
    console.log(result);
  }

  const handleChangeName = event => setFractionName(event.target.value);
  const handleChangeSymbol = event => setFractionSymbol(event.target.value);
  const handleChangeSupply = event => setFractionSupply(event.target.value);
  const onChange = event => setRoyalityValue(event.target.value);
  
  return (
    <div className={styles.statusPage}>
        <SideBar />
        <div className={styles.statusPageBody}>
          {currentPoints.point ? 
          <div className={styles.statusHead}>
            <img src={currentPoints.point.event_image} />
            <div className={styles.statusContext}>
              <div className={styles.statusContextFirst}>
                <h5>{moment(currentPoints.point.createdAt).format("LLLL")}</h5>
                <h3>{currentPoints.point.title}</h3>
                <p>{currentPoints.point.address}</p>
              </div>
              <div className={styles.statusContextSecond}>
                <p>Reward: <span style={currentPoints.point.type == "NFT" ? {} : currentPoints.point.type == "FNFT" ? {background: "#F2C94C"} : {background: "#006DFF"}}>{currentPoints.point.type}</span></p>
              </div>
            </div>
          </div> : ""}



          {currentPoints && currentPoints.point && currentPoints.point.type == "FNFT" && currentPoints.point.detail && typeof(currentPoints.point.detail.fractionAddress) == "undefined" ? 
          <>
            <div>
              <DefaultInput maxWidth={"300px"} onChangeValue={handleChangeName} placeholder={currentPoints.point.detail.name + " 1"} label="New Token Name *" required={true} />
            </div>
            <div>
              <DefaultInput maxWidth={"300px"} onChangeValue={handleChangeSymbol} placeholder="GEO" label="Token Symbol *" required={true}/>
            </div>
            <div>
              <DefaultInput maxWidth={"300px"} onChangeValue={handleChangeSupply} placeholder="100" label="Token Supply *" required={true}/>
            </div>
            <div>
            <Slider className={styles.slider} style={{width: "300px"}} max={10} label="Annual Management Fee *" value={royalityValue} onChange={onChange} />
              {/* <DefaultInput onChangeValue={handleChangeName} placeholder="Name your event here" label="Annual Management Fee *" required={true}/> */}
            </div>
          </>
          : ""}

          {currentPoints && currentPoints.point && currentPoints.point.type == "FNFT" && currentPoints.point.detail && typeof(currentPoints.point.detail.fractionAddress) == "undefined" ? 
          <>
          <div>
            <button style={isContractApproved ? {background: "#006DFF", color: "white"} : {}} onClick={() => handleApproveMainContract()} className={styles.fractionalizeNFT}>1 - Approve Contract NFT</button>
            <button style={isDepositNFT ? {background: "#006DFF", color: "white" } : {}} onClick={() => handleDepositNFT()} className={styles.fractionalizeNFT}>2 - Deposit NFT</button>
            <button style={isFractionalize ? {background: "#006DFF", color: "white" } : {}} className={styles.fractionalizeNFT} onClick={() => handleFractionNft()}>3 - Fractionalize NFT</button>
            <button style={isFractionAddress ? {background: "#006DFF", color: "white" } : {}} className={styles.fractionalizeNFT} onClick={() => getFractionContractAddress()}>4 - GET Fraction Contract Address</button>
            <button className={styles.fractionalizeNFT} onClick={() => getTokens()}>5 - Receive Fraction Tokens</button>
          </div>
          
          </>
          : ""}

          {fractionAddress ? <p className={styles.fractionAddress}>Fraction Address: {fractionAddress}</p> : ""}

          {currentPoints && currentPoints.point && currentPoints.point.detail && currentPoints.point.detail.fractionAddress ? 
          <>
          {/* <button style={isFractionAddress ? {background: "#006DFF", color: "white" } : {}} className={styles.fractionalizeNFT} onClick={() => getFractionContractAddress()}>4 - GET Fraction Contract Address</button> */}
          <p className={styles.fractionAddress}>Fraction Address: {currentPoints.point.detail.fractionAddress}</p>
          <span className={styles.fractionAddressInformation}>⚠️ Your tokens are at this address, please use this address when adding custom tokens to your wallet to receive tokens.</span>
          </> : ""}

          {currentPoints && currentPoints.point && currentPoints.point.detail && currentPoints.point.detail.description ? <p className={styles.detailDescription}>{currentPoints.point.detail.description}</p> : <p className={styles.detailDescription}>No description.</p>}
          
          {white_list ? white_list.length != 0 ?
            <WhiteListTable callback={currentPoints.point.type == "NFT" ? handleSendGift : senffnft} users={white_list} type={currentPoints.point.type} /> 
            : 
            <div className={styles.noUser}>
              <h4>There is no user joined!</h4>
            </div>
            :
            ""
          }
        </div>
    </div>
  )
}

export default Status