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
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = 'pk.eyJ1Ijoia3ViaWxheWNrbWsiLCJhIjoiY2w0NjNvdmZvMDRzYTNqbHJ3enJ4b29mYSJ9.R8rk-T-yUlMh2bjNp1EBew';

const BoardModerator = () => {

  const [title, setTitle] = useState("");
  // const [nftData, setNFTData] = useState({});

  const menuConfig = {
    'Create NFT': () => {
      console.log('create nft');
      console.log(lng);
      console.log(lat);
      setTitle("nft")
      setModalShow(true);
    },
    'Create Music': () => {
      console.log('create music');
      setTitle("music")
      setModalShow(true);
    },
    'Create Gift': () => {
      console.log('create gift');
      setTitle("gift")
      setModalShow(true);
    },
    // 'Submenu': {
    //   'Submenu 1': () => {
    //     console.log('wololol')
    //   },
    //   'Submenu 2': {
    //     'electric': () => {
    //       console.log('wololol')
    //     },
    //     'boogaloo': () => {
    //       console.log('boogaloo')
    //     }, 
    //   },
    // },
  };

  const [modalShow, setModalShow] = React.useState(false);
  const [nftData, setNFTData] = useState(null);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-123.1193);
  const [lat, setLat] = useState(49.2827);
  const [zoom, setZoom] = useState(15.5);
  const { point: currentPoints } = useSelector((state) => state.point);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [contextMenu, useCM] = useContextMenu();

  let count = 1;

  useEffect(() => {
    if(map.current){
      if(currentPoints){
        createPinModel(currentPoints);
        // document.getElementById('features').innerHTML = JSON.stringify(currentPoints, null, 2);
      } 
    }else{
      dispatch(getPoint())
      // dispatch(getNFTPoint())
      if(currentPoints) {
        createPinModel(currentPoints);
        // document.getElementById('features').innerHTML = JSON.stringify(currentPoints, null, 2);
      }
      
    }
  }, [currentPoints])

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
    map.current.getCanvas().style.cursor = 'default';

    map.current.on('mousedown', (e) => {
      setLng(e.lngLat.lng)
      setLat(e.lngLat.lat)
    });

    map.current.on('click', 'places', (e) => {
      setLng(e.lngLat.lng)
      setLat(e.lngLat.lat)
      
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;
      
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      
      new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);

    });

    map.current.on('mouseenter', 'places', () => {
      map.current.getCanvas().style.cursor = 'pointer';
      });
       
      // Change it back to a pointer when it leaves.
    map.current.on('mouseleave', 'places', () => {
      map.current.getCanvas().style.cursor = '';
    });
  })

  useEffect(() => {
    console.log('============');
    console.log('once?');
    dispatch(me());
  }, [])

  useEffect(() => {

    eventBus.on("nftData", (data) => {
      console.log(data);
      if(data){

        map.current.on('mousedown', (e) => {
          setLng(e.lngLat.lng)
          setLat(e.lngLat.lat)
          if(data){
            dispatch(setNFTPoint(
              data.name, 
              e.lngLat.lat, 
              e.lngLat.lng, 
              currentUser.fullName, 
              "NFT",
              100, 
              currentUser.walletAddress, 
              data.token_id, 
              data.contract_type,
              data.description, 
              data.image, 
              data.token_address
            ));
            eventBus.dispatch("nftDataOFF", true);
          }
        });
        
      }
    })

   
  
  }, [count])
  

  const createPinModel = (arr) => {
    arr.forEach(element => {
      console.log("elements", element.image);

        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = element.isNFT ? `url(${element.nft.image})` : `url(${img})`;
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
    <>
      <div className="" onContextMenu={useCM(menuConfig)}>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat}
        </div>
        <div ref={mapContainer} className="map-container" />
        {/* <pre id="features"></pre> */}
        <CenterModal show={modalShow} onHide={() => handleHide()} location={[lng, lat]} title={title}/>
        {contextMenu}
      </div>
      <SideProfile />
    </>
  );
};

export default BoardModerator;