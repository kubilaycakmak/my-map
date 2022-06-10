import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import CenterModal from './features/CenterModal'
import img from '../images/pin.png'
import axios from 'axios';
import eventBus from '../common/EventBus';

mapboxgl.accessToken = 'pk.eyJ1Ijoia3ViaWxheWNrbWsiLCJhIjoiY2w0NjNvdmZvMDRzYTNqbHJ3enJ4b29mYSJ9.R8rk-T-yUlMh2bjNp1EBew';

const BoardModerator = () => {

  const [modalShow, setModalShow] = React.useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-123.1193);
  const [lat, setLat] = useState(49.2827);
  const [zoom, setZoom] = useState(12);
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/kubilayckmk/cl463r634000314rrpzp38ys9',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('click', (e) => {
      setModalShow(true)
      setLng(e.lngLat.lng)
      setLat(e.lngLat.lat)
      
      const features = map.current.queryRenderedFeatures(e.point);
 
      const displayProperties = ['type','properties','id','layer','source','sourceLayer','state'];
      
      const displayFeatures = features.map((feat) => {
      const displayFeat = {};

      displayProperties.forEach((prop) => {
        displayFeat[prop] = feat[prop];
      });
        return displayFeat;
      });
      
      document.getElementById('features').innerHTML = JSON.stringify(displayFeatures,null,2
      );
    });

    getPoint();
    eventBus.on("loadPin", (val)=> {
      if(val){
        getPoint();
      }
      return () => {
        eventBus.remove("loadPin", val);
      };
    })  
  }, [])

  const getPoint = () => {
    return axios.get(process.env.REACT_APP_API_URL + "/api/point/").then(
      (response) => {
        createPinModel(response.data.points)
      }
    );
  };

  const createPinModel = (arr) => {
    arr.forEach(element => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url(${img})`;
        el.style.width = `50px`;
        el.style.height = `50px`;
        el.style.backgroundSize = '100%';

        new mapboxgl.Marker(el)
        .setLngLat([element.lng,  element.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 45 }) // add popups
            .setHTML(
              `<div className="popup-modal"><h3>${element.title}</h3><p>Author: ${element.author}</p></div>`
            )
        )
        .addTo(map.current);
    })
  }

  const handleHide = () => {
    setModalShow(false);
  }

  return (
    <div className="">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <pre id="features"></pre>
      <CenterModal show={modalShow} onHide={() => handleHide()} location={[lng, lat]}/>
    </div>
  );
};

export default BoardModerator;