import moment from 'moment';
import React, { useEffect } from 'react'
import styles from "./styles/rewardpreviewcard.module.scss"

const RewardsPreviewCard = ({ data }) => {

  useEffect(() => {
    console.log(data);
  }, [])
  
  return (
    <div className={styles.rewardCard}>
        <img className={styles.rewardCardImage} src={data.event_image[0].preview} />
        <div className={styles.rewardCardBody}>
            <div className={styles.rewardCardBodyInformation}>
                <h4>{data.startDateTS ? moment.unix(data.startDateTS).format("LLLL") : ""}</h4>
                <h3>{data.title}</h3>
                <p>{data.address}</p>
            </div>
            <div className={styles.rewardCardFooter}>
            <label>Rewards: </label>
            <span>{data.type}</span>
        </div>
        </div>
        
    </div>
  )
}

export default RewardsPreviewCard