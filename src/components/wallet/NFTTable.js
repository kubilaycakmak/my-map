import React, {useState, useEffect} from 'react'
import { useMoralisWeb3Api, useWeb3Transfer } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import styles from './nfttable.module.scss'
const NFTTable = ({ wallet, callback }) => {
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

    const options = {
      chain: "eth",
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


  useEffect(() => {
    fetchNFTMetadata(wallet)
    console.log('asd');
    
  }, [wallet])

  const addNFTtoSelectedList = (nft) => {
    const { image } = nft.metadata;
    list.push(nft);
    setSelectedNFTs(list);
    callback({...nft, image});
  }

  const deleteNFTfromSelectedList = (nft) => {
    console.log('something');
    const indexOfObject = list.findIndex(o => o.token_address === nft.token_address);
    list.splice(indexOfObject, 1);
    fetchNFTMetadata(wallet);
  }

  return (
    <div className={styles.nftTable}>
        {nftList  
            ?
            <table>
                <tbody>
                {
                    nftList.map((nft, index) => {
                        return (
                            <tr onClick={() => addNFTtoSelectedList(nft)} className={selectedNFTs[index] === nft ? styles.nftTableTrActive : styles.nftTableTr} key={index}>
                                <td>{ selectedNFTs[index] === nft ? <span  onClick={() => deleteNFTfromSelectedList(nft)}>decline</span> : ""}<img alt={nft.name} src={nft.metadata.image} /></td>
                                <td><h3>{nft.name} [{nft.amount}]</h3></td>
                            </tr>
                        )
                    })
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