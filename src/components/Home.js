import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import img from '../images/pin.png'
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1Ijoia3ViaWxheWNrbWsiLCJhIjoiY2w0NjNvdmZvMDRzYTNqbHJ3enJ4b29mYSJ9.R8rk-T-yUlMh2bjNp1EBew';



const Home = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-123.1193);
  const [lat, setLat] = useState(49.2827);
  const [zoom, setZoom] = useState(14);
  // const currentPoints = props.points;

  useEffect(() => {
    if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/kubilayckmk/cl46mwz7t000914l9wzt0ppjz',
      center: [lng, lat],
      zoom: zoom
    });

    getPoint();

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

  }, []);

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



  return (
    <div className="">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Home;


// // var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
// // mapboxgl.accessToken = 'pk.eyJ1Ijoia3ViaWxheWNrbWsiLCJhIjoiY2w0NjNvdmZvMDRzYTNqbHJ3enJ4b29mYSJ9.R8rk-T-yUlMh2bjNp1EBew';
// // var map = new mapboxgl.Map({
// // container: 'YOUR_CONTAINER_ELEMENT_ID',
// // style: 'mapbox://styles/mapbox/streets-v11'
// // });