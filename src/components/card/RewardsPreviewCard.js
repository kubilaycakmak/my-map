import React from 'react'
import styles from "./styles/rewardpreviewcard.module.scss"

const RewardsPreviewCard = ({ image, title, date, address, type}) => {
  return (
    <div className={styles.rewardCard}>
        <img className={styles.rewardCardImage} src={require("../../images/event.png")} />
        <div className={styles.rewardCardBody}>
            <div className={styles.rewardCardBodyInformation}>
                <h4>{date}</h4>
                <h3>{title}</h3>
                <p>{address}</p>
            </div>
            <div className={styles.rewardCardFooter}>
            <label>Rewards: </label>
            <span>{type}</span>
        </div>
        </div>
        
    </div>
  )
}

export default RewardsPreviewCard