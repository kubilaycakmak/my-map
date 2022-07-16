import React, { useRef, useEffect, useState } from 'react'
import './searchaddressinputwithmap.scss'
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const SearchAddressInputWithMap = ({label = "Venue Address", getAddress, getLatLng}) => {
    const count = 1;
    let markers = [];
    let map = useRef(null);
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [address, setAddress] = useState();

    useEffect(() => {
        map =  new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/kubilayckmk/cl463r634000314rrpzp38ys9',
            center: [-79.4512, 43.6568],
            zoom: 13,
            pitch: 25
        });
    
        const geocoder = new MapboxGeocoder({
            accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
            types: 'country,region,place,postcode,locality,neighborhood,address',
            marker: {
                color: 'Blue'
            },
            mapboxgl: mapboxgl
        });

        map.on('click', (e) => {
            console.log(e);
            setLng(e.lngLat.lng)
            setLat(e.lngLat.lat)

            getLatLng({
                lat: e.lngLat.lng,
                lng: e.lngLat.lat
            })

            if(markers.length == 0){
                let marker = new mapboxgl.Marker({
                    color: "#00000",
                    draggable: true
                }).setLngLat(e.lngLat)
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
        geocoder.addTo('#geocoder');
 
        // Add geocoder result to container.
        geocoder.on('result', (e) => {
            console.log(e);
            setAddress(e.result.place_name)
            getAddress(e.result.place_name)
            getLatLng({
                lat: e.result.center[0],
                lng: e.result.center[1]
            })
        });
        
        // Clear results container when search is cleared.
        geocoder.on('clear', () => {
            markers.forEach(e => {
                e.remove()
            })
            markers = [];
            geocoder.remove(map);
        });
    }, [])

    
  return (
    <div className="geocoder-outer">
        <label>{label}</label>
        <div id="geocoder"></div>
        <div id="map"></div>
    </div>
  )
}

export default SearchAddressInputWithMap