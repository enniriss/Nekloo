import React, { useRef, useCallback } from 'react';
import Map, { NavigationControl, Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import Navigation from "./Navigation";

const CustomMap = () => {
  const mapRef = useRef(null);

  const onLoad = useCallback(() => {
    const map = mapRef.current.getMap();

    // Ajouter une couche 3D après que la carte ait fini de charger
    map.addLayer({
      id: '3d-buildings',
      source: 'openmaptiles', // dépend de la source de ton style
      'source-layer': 'building', // doit exister dans ton style
      type: 'fill-extrusion',
      minzoom: 15,
      paint: {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': ['get', 'render_height'],
        'fill-extrusion-base': ['get', 'render_min_height'],
        'fill-extrusion-opacity': 0.6,
      },
    });
  }, []);

  return (
    <div className='position-relative b-0 p-0' style={{ maxHeight: '110vh', height: '100vh' }}>
      <Map
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={{
          longitude: 2.2946529583816573,
          latitude: 48.85972536041022,
          zoom: 18,
          pitch: 60,
          bearing: -60,
        }}
        mapStyle="https://api.maptiler.com/maps/positron/style.json?key=RcMak1MP1kaY6o0sBEqb"
        style={{ width: '100%', height: '100%', border: 'none', padding: 'none' }}
        onLoad={onLoad}
      >
        <NavigationControl position="top-left" />

        {/* Marker simple */}
        <Marker
          longitude={2.2946529583816573}
          latitude={48.85972536041022}
          anchor="bottom"
        >
          <div style={{
            backgroundColor: '#e74c3c',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }} />
        </Marker>

        {/* Marker avec icône personnalisée */}
        <Marker
          longitude={2.295}
          latitude={48.860}
          anchor="bottom"
        >
          <div style={{
            fontSize: '24px',
            color: '#e74c3c'
          }}>
            📍
          </div>
        </Marker>
      </Map>
      <Navigation />
    </div>
  );
};

export default CustomMap;