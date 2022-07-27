import React, { useRef, useEffect, useState } from 'react'
import './searchaddressinputwithmap.scss'
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import axios from 'axios'
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const SearchAddressInputWithMap = ({label = "Venue Address *", getAddress, getLatLng, error}) => {
    const count = 1;
    let markers = [];
    let map = useRef(null);
    let geolocate = null;
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [address, setAddress] = useState();

    useEffect(() => {
        map =  new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/kubilayckmk/cl463r634000314rrpzp38ys9',
            center: [-123.1193, 49.2827],
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
            setLng(e.lngLat.lng)
            setLat(e.lngLat.lat)

            const url =
                "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
                e.lngLat.lng +
                "," +
                e.lngLat.lat +
                ".json?access_token=" +
                "pk.eyJ1Ijoia3ViaWxheWNrbWsiLCJhIjoiY2w0NjNvdmZvMDRzYTNqbHJ3enJ4b29mYSJ9.R8rk-T-yUlMh2bjNp1EBew" +
                "&types=address";
                axios.get(url).then((res) => {
                    const { features } = res.data;
                        if(features.length != 0){
                            setAddress(features[0].place_name);
                            getAddress(features[0].place_name);
                            geocoder.query(features[0].place_name)
                        }
                }).catch((e) => {
                console.log(e);
            });

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

        geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true
          }); 
          map.addControl(geolocate);
          
          map.on('load', () => {
            geolocate.trigger();
        })
        
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

    const findLocation = () => {
        geolocate.trigger();
    }

    
  return (
    <div className="geocoder-outer">
        <label style={error.includes(label) ? {color: "red"} : {color: "#3C3C3C"}}>{label}</label>
        <div id="geocoder"></div>
        <div id="map">
        <button className="findMe" onClick={() => findLocation()}><img src={require("../locate.png")}/></button>
        </div>
    </div>
  )
}

export default SearchAddressInputWithMap