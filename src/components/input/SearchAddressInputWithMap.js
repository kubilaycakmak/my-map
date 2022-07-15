import React, { useEffect } from 'react'
import './searchaddressinputwithmap.scss'
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const SearchAddressInputWithMap = ({label = "Venue Address"}) => {
    const count = 1;

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/kubilayckmk/cl463r634000314rrpzp38ys9',
            center: [-79.4512, 43.6568],
            zoom: 13
        });
    
        const geocoder = new MapboxGeocoder({
            accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
            types: 'country,region,place,postcode,locality,neighborhood,address',
            marker: {
                color: 'Blue'
            },
            mapboxgl: mapboxgl
        });
        
        map.addControl(geocoder);
        geocoder.onAdd(map);
        geocoder.addTo('#geocoder');

        // const results = document.getElementById('result');
 
        // Add geocoder result to container.
        geocoder.on('result', (e) => {
            console.log(JSON.stringify(e.result, null, 2));
            // results.innerText = JSON.stringify(e.result, null, 2);
        });
        
        // Clear results container when search is cleared.
        geocoder.on('clear', () => {
            // results.innerText = '';
        });

        
    }, [count])

    
  return (
    <div className="geocoder-outer">
        <label>{label}</label>
        <div id="geocoder"></div>
        <div id="map"></div>
    </div>
  )
}

export default SearchAddressInputWithMap