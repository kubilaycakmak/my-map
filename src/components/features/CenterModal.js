import React, { useEffect, useState } from 'react'
import { Modal, Button, InputGroup,FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { setPromoPoint } from '../../actions/point'
import eventBus from '../../common/EventBus';

function CenterModal(props) {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [title, setTitle] = new useState();
    const [type, setType] = new useState();
    const [limit, setLimit] = new useState();

    const handleTitleChange = (e) => {
      setTitle(e.target.value)
    }
    const handleTypeChange = (e) => {
      setType(e.target.value)
    }
    const handleLimitChange = (e) => {
      setLimit(e.target.value)
    }

    const handleSubmit = () => {
      let lng = props.location[0]
      let lat = props.location[1]
      let author = currentUser.username; 
      dispatch(setPromoPoint(title, String(lat), String(lng), author, type, limit))
      eventBus.dispatch('reRender');
      props.onHide();
    }

    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title} Create new point</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
            <FormControl
              placeholder="Title"
              aria-label="title"
              aria-describedby="basic-addon1"
              onChange={handleTitleChange}
            />
        </InputGroup>
        <InputGroup className="mb-3">
            <FormControl
              placeholder="Type"
              aria-label="type"
              aria-describedby="basic-addon1"
              onChange={handleTypeChange}
            />
        </InputGroup>
        <InputGroup className="mb-3">
            <FormControl
              placeholder="Limit"
              aria-label="limit"
              aria-describedby="basic-addon1"
              onChange={handleLimitChange}
            />
        </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      // <Modal
      //   {...props}
      //   size="lg"
      //   aria-labelledby="contained-modal-title-vcenter"
      // >
      //   <Modal.Header>

    
      //   </Modal.Header>
      //   <Modal.Footer>
      //     <Button onClick={props.onHide}>Close</Button>
      //     <Button onClick={handleSubmit}>Submit</Button>
      //   </Modal.Footer>
      // </Modal>
    );
}

export default CenterModal