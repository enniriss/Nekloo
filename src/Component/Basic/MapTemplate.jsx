import Map, { NavigationControl, Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import React, { useRef, useCallback } from 'react';


export default function MapTemplate(props) {
    const mapRef = useRef(null);
    const onLoad = useCallback(() => {
        const map = mapRef.current.getMap();
        
        map.addLayer({
          id: '3d-buildings',
          source: 'openmaptiles',
          'source-layer': 'building',
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': ['get', 'render_height'],
            'fill-extrusion-base': ['get', 'render_min_height'],
            'fill-extrusion-opacity': 0.6,
          },});}, []);
    return (
        <Map ref={mapRef} mapLib={maplibregl} initialViewState={{
            longitude: props.lon,
            latitude: props.lat,
            zoom: 18, pitch: 60, bearing: -60,}}
            mapStyle="https://api.maptiler.com/maps/positron/style.json?key=RcMak1MP1kaY6o0sBEqb"
            style={{ width: '100%', height: '100%', border: 'none', padding: 'none' }}
            onLoad={onLoad}></Map>
    )
}