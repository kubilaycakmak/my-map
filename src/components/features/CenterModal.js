import React, {useState} from 'react'
import { Modal, Button, InputGroup,FormControl  } from 'react-bootstrap';
import { useSelector } from "react-redux";
import eventBus from '../../common/EventBus';
import axios from 'axios'

function CenterModal(props) {
    const { user: currentUser } = useSelector((state) => state.auth);

    const [title, setTitle] = new useState();

    const handleChange = (e) => {
      setTitle(e.target.value)
    }

    const handleSubmit = () => {
      let lng = props.location[0]
      let lat = props.location[1]
      let author = currentUser.username; 
      
      setPoint(title, lng, lat, author)
      
      props.onHide();

    }

    const setPoint = (title, lng, lat, author) => {
      return axios.post(process.env.REACT_APP_API_URL + '/api/point/', {
        title,
        lng,
        lat,
        author
      }).then(
        (response) => {
          if(response.status === 201){
            eventBus.dispatch('loadPin', true);
          }
          
      });
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
        <InputGroup className="mb-3">
            <FormControl
              placeholder="Title"
              aria-label="title"
              aria-describedby="basic-addon1"
              onChange={handleChange}
            />
        </InputGroup>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default CenterModal