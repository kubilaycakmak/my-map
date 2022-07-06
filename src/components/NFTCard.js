import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import eventBus from '../common/EventBus';

function NFTCard({metadata, contract_type, name, owner_of, token_address, token_id, index}) {

  const [activeButton, setActiveButton] = useState(-1)
  let count = 1;
  const prepareNFTData = () => {
    setActiveButton(index);
    let data = {
        ...metadata,
        contract_type: contract_type,
        owner_of: owner_of,
        name: name,
        token_address: token_address,
        token_id: token_id,
    }
    eventBus.dispatch("nftData", data);
  }

  useEffect(() => {
    eventBus.on("nftDataOFF", (res) => {
      setActiveButton(-1);
    });
  
  }, [count])
  

  return (
    <Card key={index} style={{ minWidth: '50%', maxWidth: '50%', padding: '2px' }}>
        <Card.Img variant="top" style={{ maxHeight: '200px', minHeight: '200px', padding:"10px" }} src={metadata.image} />
        <Card.Body>
            <Card.Title>{metadata.name}</Card.Title>
            <Card.Text>
                {metadata.description}
            </Card.Text>
            <Button style={activeButton === index ? { backgroundColor:"red"} : { backgroundColor:"black" }} onClick={prepareNFTData}>Select</Button>
        </Card.Body>
    </Card>
  )
}

export default NFTCard