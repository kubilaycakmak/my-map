import React, { useEffect } from 'react'
import SideBar from '../components/bar/SideBar'
import styles from './styles/status.module.scss'
import { useHistory } from "react-router-dom";
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { getPointById } from '../actions/point';
import WhiteListTable from '../components/table/WhiteListTable';
import Moralis from "moralis";
import moment from 'moment';

const Status = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { point: currentPoints } = useSelector((state) => state.point);
  const { white_list } = currentPoints;

  useEffect(() => {
    if(history.location.search){
      const param = queryString.parse(history.location.search);
      dispatch(getPointById(param.id));
    }else{
      history.push("/event");
    }
  }, [])

  const handleSendGift = async (data) => {
    const { detail } = currentPoints;
    const web3 = await Moralis.enableWeb3();
    const options = {
      type: "erc721",
      receiver: data,
      contractAddress: detail.owner_of,
      tokenId: detail.token_id
  };

  console.log(options);
  let transaction = await Moralis.transfer(options)
  console.log(transaction);
  }
  
  return (
    <div className={styles.statusPage}>
        <SideBar />
        <div className={styles.statusPageBody}>
          {currentPoints ? 
          <div className={styles.statusHead}>
            <img src={currentPoints.event_image} />
            <div className={styles.statusContext}>
              <div className={styles.statusContextFirst}>
                <h5>{moment(currentPoints.createdAt).format("LLLL")}</h5>
                <h3>{currentPoints.title}</h3>
                <p>{currentPoints.address}</p>
              </div>
              <div className={styles.statusContextSecond}>
                <p>Reward: <span style={currentPoints.type == "NFT" ? {} : currentPoints.type == "FNFT" ? {background: "#F2C94C"} : {background: "#006DFF"}}>{currentPoints.type}</span></p>
              </div>
            </div>
          </div> : ""}
          
          {white_list ? white_list.length != 0 ?
            <WhiteListTable callback={handleSendGift} users={white_list} type={currentPoints.type} /> 
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