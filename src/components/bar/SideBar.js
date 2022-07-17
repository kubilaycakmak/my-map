import React, {useEffect} from 'react'
import { NavLink } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import styles from "./SideBar.module.scss"
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getOwnEventPoint } from '../../actions/point'

function SideBar() {

  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const handleClick = (url) => {
    let urlString = url;
    // if(url == "/event"){
    //   history.push(urlString);
    //   history.go();
    // }
    // if(url == "/mod"){
    //   history.push(urlString);
    //   history.go();
    // }
    history.push(urlString)
  }

  return (
    <div className={styles.sidebar}>
        <img onClick={() => handleClick("/event")} src={pathname == "/event" ? require("../../images/event-active.png") : require("../../images/event.png")}/>
        <img onClick={() => handleClick("/event-action")} src={pathname == "/event-action" ? require("../../images/status-active.png") : require("../../images/status.png")}/>
        <img onClick={() => handleClick("/wallet")} src={pathname == "/wallet" ? require("../../images/wallet-active.png") : require("../../images/wallet.png")}/>
        <img onClick={() => handleClick("/setting")} src={pathname == "/setting" ? require("../../images/setting-active.png") : require("../../images/setting.png")}/>
        <img onClick={() => handleClick("/mod")} src={pathname == "/mod" ? require("../../images/map-active.png") : require("../../images/map-active.png")}/>
    </div>
  )
}

export default SideBar