import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import CenterModal from './features/CenterModal'
import img from '../images/pin.png'
import eventBus from '../common/EventBus';
import { getPoint } from '../actions/point'
import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = 'pk.eyJ1Ijoia3ViaWxheWNrbWsiLCJhIjoiY2w0NjNvdmZvMDRzYTNqbHJ3enJ4b29mYSJ9.R8rk-T-yUlMh2bjNp1EBew';

const BoardModerator = () => {

  const [modalShow, setModalShow] = React.useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-123.1193);
  const [lat, setLat] = useState(49.2827);
  const [zoom, setZoom] = useState(15.5);
  const { point: currentPoints } = useSelector((state) => state.point);
  const dispatch = useDispatch();

  useEffect(() => {
    if(map.current){
      console.log('map loaded');
      if(currentPoints) createPinModel(currentPoints);
      
    }else{
      console.log('map unloaded');
      dispatch(getPoint())
      if(currentPoints) createPinModel(currentPoints);
    }
    // // console.log(document.getElementsByClassName('marker').length);
    //   if(currentPoints && document.getElementsByClassName('marker').length == 0) {
    //     createPinModel(currentPoints);
    //   }
  })
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/kubilayckmk/cl463r634000314rrpzp38ys9',
      center: [lng, lat],
      zoom: zoom,
      pitch: 45,
      bearing: -17.6,
      antialias: true
    });

    map.current.on('click', (e) => {
      
      setLng(e.lngLat.lng)
      setLat(e.lngLat.lat)
      const features = map.current.queryRenderedFeatures(e.point);
 
      const displayProperties = ['type','properties','id'];
      
      const displayFeatures = features.map((feat) => {
      const displayFeat = {};

      if(displayFeat?.properties?.type != 'service:alley'){
        setModalShow(true)
      }
      displayProperties.forEach((prop) => {
        displayFeat[prop] = feat[prop];
      });
        return displayFeat;
      });

      document.getElementById('features').innerHTML = JSON.stringify(displayFeatures,null,2);
    });
  })

  const createPinModel = (arr) => {
    arr.forEach(element => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url(${img})`;
        el.style.width = `50px`;
        el.style.height = `50px`;
        el.style.backgroundSize = '100%';

        // console.log(map.current);
        if(map.current){
          new mapboxgl.Marker(el)
        .setLngLat([element.coordinate[1], element.coordinate[0]])
        .setPopup(
          new mapboxgl.Popup({ offset: 45 }) // add popups
            .setHTML(
              `<div className="popup-modal">
                <h3>${element.title}</h3>
                <p>Author: ${element.author}</p>
                <p>Type: ${element.type}</p>
                <p>Limit: ${element.limit}</p>
              </div>`
            )
        )
        .addTo(map.current);
        }
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