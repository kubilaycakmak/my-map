import React, {useState, useEffect} from 'react'
import { useMoralisWeb3Api, useWeb3Transfer } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import styles from './nfttable.module.scss'

const NFTTable = ({ wallet, callback, typeNFT }) => {
  let list = [];
  const [selectedNFTs, setSelectedNFTs] = useState([]);
  const [nftList, setNFTList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const Web3Api = useMoralisWeb3Api();
  
  const fetchNFTMetadata = async (wallet) => {

    if(wallet) {
      console.log(wallet);
      const options = {
        chain: typeNFT == "NFT" ? "eth" : "rinkeby",
        address: wallet,
      };
      await Web3Api.account.getNFTs(options).then(
          (res) => {
            if(res.result.length !== 0){
              const newNFTStorage = res.result.map((item, index) => {
                return {
                  ...item,
                  metadata: JSON.parse(item.metadata)
                };
              })
              console.log(newNFTStorage);
              setNFTList(newNFTStorage)
              setIsLoading(false);
            }else{
              setNFTList([])
            }
          }
        ).catch(
          (err) => {
            setError(err.message);
          }
        );
      };
    }
   


  useEffect(() => {
    fetchNFTMetadata(wallet)
  }, [wallet, typeNFT])

  const addNFTtoSelectedList = (nft) => {
    // const { image } = nft.metadata;
    list.push(nft.token_id);
    setSelectedNFTs(list);
    console.log(list);
    callback({...nft});
  }

  const deleteNFTfromSelectedList = (nft) => {
    // const { image } = nft.metadata;
    console.log('something');
    list.splice(0, 1);
    setSelectedNFTs(list)
  }

  return (
    <div className={styles.nftTable}>
        {nftList  
            ?
            <table>
                <tbody>
                {
                  nftList.length != 0 ?
                    nftList.map((nft, index) => {
                        return (
                            <tr  className={selectedNFTs.includes(nft.token_id) ? styles.nftTableTrActive : styles.nftTableTr} key={index}>
                                <td>{ selectedNFTs.includes(nft.token_id) ? <span  onClick={() => deleteNFTfromSelectedList(nft)}>decline</span> : ""}<img alt={nft.name} src={nft.metadata ? typeNFT == "NFT" ? nft.metadata.image : require("../../pages/default.png") : require("../../pages/default.png")} /></td>
                                <td onClick={() => addNFTtoSelectedList(nft)}><h3>{nft.name} [{nft.amount}]</h3></td>
                            </tr>
                        )
                    })
                    :
                    <tr>
                      <td>
                        <div className={styles.noNFT}>
                          <h4>Sorry, you don't have any NFT in your wallet 😕</h4>
                        </div>
                      </td>
                    </tr>
                }
                </tbody>
            </table>
            :
            "Loading"
        }
    </div>
  )
}

export default NFTTable