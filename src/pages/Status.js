import React, { useEffect } from 'react'
import SideBar from '../components/bar/SideBar'
import styles from './styles/status.module.scss'
import { useHistory } from "react-router-dom";
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { getPointById, updatePoint } from '../actions/point';
import WhiteListTable from '../components/table/WhiteListTable';
import Moralis from "moralis";
import moment from 'moment';

const Status = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { point: currentPoints } = useSelector((state) => state);
  const { white_list, _id } = currentPoints.point || [];
  // Moralis.enableWeb3();

  useEffect(() => {
    if(history.location.search){
      const param = queryString.parse(history.location.search);
      dispatch(getPointById(param.id));
      }else{
        history.push("/event");
      }
    }, [])

    const handleSendGift = async (data) => {
      const { detail } = currentPoints.point || {};
      console.log(detail);
      const web3 = await Moralis.enableWeb3();
      const options = {
        type: detail.contract_type.toLowerCase(),
        receiver: data,
        contractAddress: detail.token_address,
        tokenId: parseInt(detail.token_id)
    };

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
          
          {white_list ? white_list.length != 0 ?
            <WhiteListTable callback={handleSendGift} users={white_list} type={currentPoints.point.type} /> 
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