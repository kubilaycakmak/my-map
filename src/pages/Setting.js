import React, { useEffect } from 'react'
import SideBar from '../components/bar/SideBar'
import DefaultInput from '../components/input/DefaultInput'
import styles from './styles/setting.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../components/button/SubmitButton';
const Setting = () => {

  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <div className={styles.settingPage}>
       <div><SideBar /></div>
       <div className={styles.settingPageBody}>
          <h3>Setting</h3>
          <p>Lorem impsum lorem ipsum</p>
          <div className={styles.settingAvatar}>
            <img className="avatar-img" src={require('../components/button/avatar/avatar.jpg')}/>
          </div>
          <div>
            <DefaultInput onChangeValue placeholder={currentUser.fullName} label="Full Name" />
            <DefaultInput onChangeValue placeholder={currentUser.walletAddress} label="Wallet Address"/>
            <DefaultInput onChangeValue placeholder={"********"} label="Password"/>
            <SubmitButton text="Save"/>
          </div>
       </div>
    </div>
  )
}

export default Setting