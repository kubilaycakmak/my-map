import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import CenterModal from './features/CenterModal'
import img from '../images/pin.png'
import eventBus from '../common/EventBus';
import { getNFTPoint, getPoint } from '../actions/point'
import { useDispatch, useSelector } from 'react-redux';
import useContextMenu from "contextmenu";
import "contextmenu/ContextMenu.css";
import SideProfile from './SideProfile.js';
import { me } from '../actions/user';
import { setNFTPoint } from '../actions/point';
import SideBar from './bar/SideBar';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import styles from './boardmoderator.module.scss'
import axios from 'axios';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = "pk.eyJ1Ijoia3ViaWxheWNrbWsiLCJhIjoiY2w0NjNvdmZvMDRzYTNqbHJ3enJ4b29mYSJ9.R8rk-T-yUlMh2bjNp1EBew"

const BoardModerator = () => {

  const [title, setTitle] = useState("");
  let markers = [];
  // const [nftData, setNFTData] = useState({});

  const [modalShow, setModalShow] = React.useState(false);
  const [nftData, setNFTData] = useState(null);
  const mapContainer = useRef(null);
  let map = useRef(null);
  const [lng, setLng] = useState(-123.1193);
  const [lat, setLat] = useState(49.2827);
  const [address, setAddress] = useState();
  const [zoom, setZoom] = useState(15.5);
  const { point: currentPoints } = useSelector((state) => state.point);
  const dispatch = useDispatch();

  useEffect(() => {
    map =  new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/kubilayckmk/cl463r634000314rrpzp38ys9',
      center: [lng, lat],
      zoom: 13,
      pitch: 45
    });

    const geocoder = new MapboxGeocoder({
      accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      types: 'country,region,place,postcode,locality,neighborhood,address',
      mapboxgl: mapboxgl
    });

    map.on('click', (e) => {
      setLng(e.lngLat.lng)
      setLat(e.lngLat.lat)
      
      if(markers.length == 0){
          let marker = new mapboxgl.Popup({
              color: "#00000",
              draggable: true
          }).setLngLat(e.lngLat)
          .setHTML(`<a href='/create-event?lat=${lat}&lng=${lng}' 
          style="
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 18px;
          color: #686868;
          ">Create Event</a>`)
          .addTo(map);

          markers.push(marker);
      }else{
          markers.forEach(e => {
              e.remove();
          })
          markers = []
      }
    });
  
    map.addControl(geocoder);
    geocoder.onAdd(map);

    // Add geocoder result to container.
    geocoder.on('result', (e) => {
        console.log(e);
    });
    
    geocoder.on('clear', () => {
        markers.forEach(e => {
            e.remove()
        })
        markers = [];
        geocoder.remove(map);
    });

    if(!currentPoints){
      dispatch(getPoint())
      if(currentPoints){
        if(currentPoints.length != 0){
          currentPoints.forEach((mark, index) => {
            new mapboxgl.Marker({
              color: "#00000",
              draggable: false
            }).setLngLat({
              lat: mark.coordinate[0],
              lng: mark.coordinate[1]
            })
            .addTo(map);
          })
        }
      }
    }else{
      if(currentPoints.length != 0){
        currentPoints.forEach((mark, index) => {
          new mapboxgl.Marker({
            color: "#00000",
            draggable: false
          }).setLngLat({
            lat: mark.coordinate[0],
            lng: mark.coordinate[1]
          })
          .addTo(map);
        })
      }
    }
    
  }, [])


  // useEffect(() => {
  //   if(map.current){
  //     if(currentPoints){
  //       createPinModel(currentPoints);
  //     } 
  //   }else{
  //     dispatch(getPoint())
  //     if(currentPoints) {
  //       createPinModel(currentPoints);
  //     }
      
  //   }
  // }, [currentPoints])

  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: 'mapbox://styles/kubilayckmk/cl463r634000314rrpzp38ys9',
  //     center: [lng, lat],
  //     zoom: zoom,
  //     pitch: 45,
  //     bearing: -17.6,
  //     antialias: true
  //   });
  //   map.current.getCanvas().style.cursor = 'default';

  //   map.current.on('mousedown', (e) => {
  //     setLng(e.lngLat.lng)
  //     setLat(e.lngLat.lat)
  //   });

  //   map.current.on('click', 'places', (e) => {
  //     setLng(e.lngLat.lng)
  //     setLat(e.lngLat.lat)
      
  //     const coordinates = e.features[0].geometry.coordinates.slice();
  //     const description = e.features[0].properties.description;
      
  //     // Ensure that if the map is zoomed out such that multiple
  //     // copies of the feature are visible, the popup appears
  //     // over the copy being pointed to.
  //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  //     }
      
  //     new mapboxgl.Popup()
  //     .setLngLat(coordinates)
  //     .setHTML(description)
  //     .addTo(map);

  //   });

  //   map.current.on('mouseenter', 'places', () => {
  //     map.current.getCanvas().style.cursor = 'pointer';
  //     });
       
  //     // Change it back to a pointer when it leaves.
  //   map.current.on('mouseleave', 'places', () => {
  //     map.current.getCanvas().style.cursor = '';
  //   });
  // })

  // useEffect(() => {
  //   console.log('============');
  //   console.log('once?');
  //   dispatch(me());
  // }, [])

  // useEffect(() => {

  //   eventBus.on("nftData", (data) => {
  //     console.log(data);
  //     if(data){

  //       map.current.on('mousedown', (e) => {
  //         setLng(e.lngLat.lng)
  //         setLat(e.lngLat.lat)
  //         if(data){
  //           dispatch(setNFTPoint(
  //             data.name, 
  //             e.lngLat.lat, 
  //             e.lngLat.lng, 
  //             currentUser.fullName, 
  //             "NFT",
  //             100, 
  //             currentUser.walletAddress, 
  //             data.token_id, 
  //             data.contract_type,
  //             data.description, 
  //             data.image, 
  //             data.token_address
  //           ));
  //           eventBus.dispatch("nftDataOFF", true);
  //         }
  //       });
        
  //     }
  //   })

   
  
  // }, [count])
  

  // const createPinModel = (arr) => {
  //   arr.forEach(element => {
  //       const el = document.createElement('div');
  //       el.className = 'marker';
  //       el.style.backgroundImage = element.isNFT ? `url(${element.nft.image})` : `url(${img})`;
  //       el.style.width = `50px`;
  //       el.style.height = `50px`;
  //       el.style.backgroundSize = '100%';

  //       // console.log(map.current);
  //       if(map.current){
  //         new mapboxgl.Marker(el)
  //       .setLngLat([element.coordinate[1], element.coordinate[0]])
  //       .setPopup(
  //         new mapboxgl.Popup({ offset: 45 }) // add popups
  //           .setHTML(
  //             `<div className="popup-modal">
  //               ${element.isNFT ? (`<img style="width: 120px; height:120px" src=${element.nft.image} />`) : ""}  
  //               <h4>${element.title}</h4>
  //               <p>Author: ${element.author}</p>
  //               <p>Type: ${element.type}</p>
  //               ${element.isNFT ? (`<p>People: <b>${element.white_list.length}</b></p>`) : ""}  
  //             </div>`
  //           )
  //       )
  //       .addTo(map.current);
  //       }
  //   })
  // }

  const handleHide = () => {
    setModalShow(false);
  }

  return (
    <>
      <div className={styles.board}>
        <div className={styles.map} id="map"></div>
        <div className={styles.coordinateInformations}>
          <p><b>Longitude</b>:{lng}</p>
          <p style={{marginLeft: "12px"}}><b>Latitude</b>: {lat}</p>
        </div>
        <SideBar />
        
      </div>
    </>
  );
};

export default BoardModerator;