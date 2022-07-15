import React, { useEffect } from 'react'
import './searchaddressinput.scss'

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const SearchAddressInput = ({label = "Venue Address"}) => {
    const count = 1;
    const geocoder = new MapboxGeocoder({
        accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
        types: 'country,region,place,postcode,locality,neighborhood,address'
    });
    
    useEffect(() => {
        geocoder.addTo('#geocoder');

        const results = document.getElementById('result');
 
        // Add geocoder result to container.
        geocoder.on('result', (e) => {
        results.innerText = JSON.stringify(e.result, null, 2);
        });
        
        // Clear results container when search is cleared.
        geocoder.on('clear', () => {
        results.innerText = '';
        });
    }, [count])

    
  return (
    <div className="geocoder-outer">
        <label>{label}</label>
        <div id="geocoder"></div>
    </div>
  )
}

export default SearchAddressInput