import React from 'react'
import SideBar from '../components/bar/SideBar'
import styles from './styles/setting.module.scss'

const Setting = () => {
  return (
    <div className={styles.settingPage}>
       <div><SideBar /></div>
       <div className={styles.settingPageBody}>
        Setting
       </div>
    </div>
  )
}

export default Setting