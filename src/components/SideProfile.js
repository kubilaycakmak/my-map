import React, {useState} from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Metamask from "./meta/Metamask";
import './SideProfile.css'
import { Tabs, Tab, Button, Table } from 'react-bootstrap';
import { useMoralisWeb3Api, useWeb3Transfer } from "react-moralis";
import NFTCard from "./NFTCard";
import { getOwnEventPoint } from "../actions/point";
import NFTTable from "./table/NFTTable";

const SideProfile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { own_points: own_points } = useSelector((state) => state.point);

  const [NFTList, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error1, setError] = useState(null);
  const Web3Api = useMoralisWeb3Api();
  const dispatch = useDispatch();

  const [type, setType] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  
  const fetchNFTMetadata = async () => {
    const options = {
      chain: "eth",
      address: currentUser.walletAddress,
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
          setNFTs(newNFTStorage)
          setIsLoading(false);
        }else{
          setNFTs([])
        }
      }
    ).catch(
      (err) => {
        setError(err.message);
      }
    );
  };

  
  const fetchOwnNFTMetadata = async () => {
    dispatch(getOwnEventPoint(currentUser.username));
  }

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container side-profile">
    <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="info" title="Info">
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.fullName}</strong>`s Profile
            </h3>
          </header>
          <p>
            <strong>Id:</strong> {currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Wallet Address:</strong> {currentUser.walletAddress}
          </p>
          <strong>User Type: </strong>
            {currentUser.type &&
              currentUser.type}

          <Metamask />
        
      </Tab>
      <Tab eventKey="nft" title="NFT">
        <button onClick={fetchNFTMetadata}>get NFT</button>
        {/* <div>{isLoading ? "true" : "false"}</div> */}

        <div className="scrollable">
          {isLoading && NFTList.length !== 0 
          ? "NO NFT"
          :  NFTList.map((item, index) => {
            return (
              <NFTCard key={index} {...item} index={index} />
            )
          }) }
        </div>

      </Tab>
      <Tab eventKey="nftend" title="NFT Sent">
        <div className="scrollable">
        <button onClick={fetchOwnNFTMetadata}>get Own NFT</button>
          {own_points && own_points.map((item, index) => {
            console.log(item);
              return (
                <NFTTable key={index} {...item} />
              )
          }) }
        </div>
      </Tab>
    </Tabs>
    </div>
  );
};

export default SideProfile;