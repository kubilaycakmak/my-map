import React, {useEffect} from 'react'
import { NavLink } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import styles from "./SideBar.module.scss"
import { useHistory } from "react-router-dom";

function SideBar() {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className={styles.sidebar}>
        <img onClick={() => history.push("/event")} src={pathname == "/event" ? require("../../images/event-active.png") : require("../../images/event.png")}/>
        <img onClick={() => history.push("/status")} src={pathname == "/status" ? require("../../images/status-active.png") : require("../../images/status.png")}/>
        <img onClick={() => history.push("/wallet")} src={pathname == "/wallet" ? require("../../images/wallet-active.png") : require("../../images/wallet.png")}/>
        <img onClick={() => history.push("/setting")} src={pathname == "/setting" ? require("../../images/setting-active.png") : require("../../images/setting.png")}/>
    </div>
  )
}

export default SideBar