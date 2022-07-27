import React from 'react'
import styles from './styles/markercard.module.scss';
import moment from 'moment';

const MarkerCard = (data, callback) => {
  
  const {title, address, startDateTS, endDateTS, createdAt, event_image, type, limit, radius, detail } = data.data;
  
  const handleCloseAction = () => {
    console.log('close');
  }
  
  return (
    <div className={styles.marker}>
        <div className={styles.markerImage}>
            <img src={event_image} />
        </div>
        <div className={styles.markerBody}>
            <h6>{moment(createdAt).format('LLLL')}</h6>
            <h4>{title}</h4>
            <h6>{address}</h6>
            <p>Reward: <span>{type}</span></p>
        </div>
        <div onClick={() => handleCloseAction()} className={styles.markerCloseButton}><img src={require("./close.png")} /></div>
    </div>
  )
}

export default MarkerCard