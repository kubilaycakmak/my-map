import React from 'react'
import { Tabs, Tab, Button, Table } from 'react-bootstrap';
import { useMoralisWeb3Api, useWeb3Transfer } from "react-moralis";
import Moralis from "moralis";

const NFTTable = ({white_list, title, nft}) => {

  const SendNft = async (type, receiver, contractAddress, tokenId) =>  {
    const web3 = await Moralis.enableWeb3();
    const options = {
        type: "erc1155",
        receiver: receiver,
        contractAddress: contractAddress,
        tokenId: tokenId,
        amount: 1,
    };

    console.log(options);

    let transaction = await Moralis.transfer(options)
    console.log(transaction);
  }

  return (
    <table>
        <p>{title}</p>
        {
        white_list.map((user, index) => {
            return (
            <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Email Address</th>
                    <th>Wallet Address</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{index+1}</td>
                        <td>{user.email.substring(0, 5)}...{user.email.substring(user.wallet.length - 5)}</td>
                        <td>{user.wallet.substring(0, 5)}...{user.wallet.substring(user.wallet.length - 5)}</td>
                        <td><Button onClick={() => SendNft(nft.contract_type, user.wallet, nft.author_wallet, nft.token_id)}>Confirm</Button></td>
                    </tr>
                </tbody>
            </Table>
            </>
            )
        })
        }
    </table>
  )
}

export default NFTTable