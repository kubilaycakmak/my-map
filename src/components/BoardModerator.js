import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { getOwnEventPoint } from '../actions/point'
import { useDispatch, useSelector } from 'react-redux';
import "contextmenu/ContextMenu.css";
import SideBar from './bar/SideBar';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import styles from './boardmoderator.module.scss'
import MarkerCard from './card/MarkerCard';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = "pk.eyJ1Ijoia3ViaWxheWNrbWsiLCJhIjoiY2w0NjNvdmZvMDRzYTNqbHJ3enJ4b29mYSJ9.R8rk-T-yUlMh2bjNp1EBew"

const BoardModerator = () => {

  let markers = [];
  const dispatch = useDispatch();
  let map = useRef(null);
  let geolocate = null;
  const [lng, setLng] = useState(-123.1193);
  const [lat, setLat] = useState(49.2827);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { point: currentPoints } = useSelector((state) => state);
  const [popup, setPopup] = useState({
    isActive:false,
    data:null
  })
  useEffect(() => {
    // if(currentPoints.points.length == 0) dispatch(getOwnEventPoint(currentUser.id))
    // dispatch(getOwnEventPoint(currentUser.username))
   
    
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/kubilayckmk/cl463r634000314rrpzp38ys9',
      center: [lng, lat],
      zoom: 13,
      pitch: 45
    });

    if(map){
      map.on('click', (e) => {
        setLng(e.lngLat.lng)
        setLat(e.lngLat.lat)
        if(markers.length == 0){
            let marker = new mapboxgl.Popup({
                color: "#00000",
                draggable: true
            }).setLngLat(e.lngLat)
            .setHTML(`
            <a href='/create-event?lat=${e.lngLat.lat}&lng=${e.lngLat.lng}' 
              style="
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              line-height: 18px;
              color: #686868;
            ">Create Event</a>`)
            .addTo(map);
            // setPopup({isActive: false, data: null})
            markers.push(marker);
        }else{
            markers.forEach(e => {
                e.remove();
            })
            markers = []
        }
      });


      geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
      }); 
      map.addControl(geolocate);
      
      map.on('load', () => {
          geolocate.trigger();
        // setPopup({isActive: false, data: null});
      })

      if(currentPoints.points){
        var popup = new mapboxgl.Popup()
          .setText('Construction on the Washington Monument began in 1848.');

          currentPoints.points.forEach((mark, index) => {
            const marker = new mapboxgl.Marker({
              color: "#00000",
              draggable: false
            }).setLngLat({
              lat: mark.coordinate[0],
              lng: mark.coordinate[1]
            })
            .addTo(map);

            marker.getElement().addEventListener('click', () => {
              console.log(mark);
              setPopup({
                isActive: true,
                data: mark
              })
            });
          })
      }
    }

  }, [])

  const findLocation = () => {
    
    if(geolocate) {
      geolocate.trigger();
    }else{
      geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        trackUserLocation: true
      }); 

      geolocate.trigger();
    }

    
  }

  const handleClose = (e) => {
    console.log(e);
  }

  return (
    <>
      <div className={styles.board}>
        {/* {currentPoints.points ?  : "" } */}
        <div className={styles.map} id="map"></div>
        <button className={styles.findMe} ><img onClick={() => findLocation()} src={require("./locate.png")}/></button>
        <div className={styles.coordinateInformations}>
          <p><b>Longitude</b>:{lng}</p>
          <p style={{marginLeft: "12px"}}><b>Latitude</b>: {lat}</p>
        </div>
        {popup.isActive && (<MarkerCard callback={handleClose} data={popup.data} />)}
        <SideBar />
      </div>
    </>
  );
};
export default BoardModerator;