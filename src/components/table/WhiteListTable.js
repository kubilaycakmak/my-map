import React, {useEffect} from 'react'
import styles from './whitelisttable.module.scss'
import Table from 'react-bootstrap/Table';

const WhiteListTable = ({users, callback, type}) => {

    useEffect(() => {

    }, [])

    const handleSendGift = (wallet) => {
        callback(wallet)
    }
    
  return (
    <Table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>Order</th>
          <th className={styles.th}>Email</th>
          {type == "NFT" || type == "FNFT" ? <th className={styles.th}>Wallet Address</th> : "" }
          {type == "NFT" || type == "FNFT" ? <th className={styles.th}>Action</th> : "" }
        </tr>
      </thead>
      <tbody>
          {
            users && users.map((item, index) =>{
                return (
                    <>
          <tr className={styles.tr}>
            
                            <td>{index + 1}</td>
                            <td>{item.email}</td>
                            {type == "NFT" || type == "FNFT" ? <td>{item.wallet}</td> : "" }
                            {type == "NFT" || type == "FNFT" ? item.receive ? <td style={{color: "green"}}>Success</td> : <td><button onClick={() => handleSendGift(item.wallet)}>Send NFT</button></td> : ""}
               
          </tr>
                   </>
                   )
               })
           
           }
      </tbody>
    </Table>
  )
}

export default WhiteListTable