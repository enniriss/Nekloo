import { useState, useRef, useCallback, useEffect } from 'react';
import Map, { NavigationControl, Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import Navigation from "../Basic/Navigation";

export default function MapLive() {
    const [coord, setCoord] = useState(null);
    const [error, setError] = useState(null);
    const [places, setPlaces] = useState([]);
    const [isTracking, setIsTracking] = useState(true);
    const mapRef = useRef(null);
    const watchIdRef = useRef(null);

        const onLoad = useCallback(() => {
            const map = mapRef.current?.getMap();
            if (!map) return;
        
            try {
                // Ajouter une couche 3D après que la carte ait fini de charger
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
                    },
                });
            } catch (error) {
                console.log('Couche 3D non disponible:', error);
            }
        }, []);

        const fetchPlaces = async () => {
            try {
                // Simulation de données - remplacez par votre vraie API
                const token = localStorage.getItem('token');
                const response = await fetch(`https://nekloo-api.onrender.com/places/readall`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${token}`}
                });
                const data = await response.json();
                setPlaces(data.data);
                
                // setPlaces([]);
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        };

        useEffect(() => {
            fetchPlaces();
        }, []);

    useEffect(() => {
        const startTracking = () => {
            if (!navigator.geolocation) {
                setError('La géolocalisation n\'est pas supportée par ce navigateur');
                setCoord({ lat: 48.8566, lon: 2.3522 });
                return;
            }

            const watchOptions = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 30000
            };

            const handlePositionUpdate = (position) => {
                const newCoord = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                };
                
                setCoord(newCoord);
                setError(null);
                
                console.log('Position mise à jour:', newCoord);
            };

            const handlePositionError = (error) => {
                console.error('Erreur géolocalisation:', error);
                setError('Impossible d\'obtenir votre position');
                
                if (!coord) {
                    setCoord({ lat: 48.8566, lon: 2.3522 });
                }
            };

            watchIdRef.current = navigator.geolocation.watchPosition(
                handlePositionUpdate,
                handlePositionError,
                watchOptions
            );
        };

        const stopTracking = () => {
            if (watchIdRef.current) {
                navigator.geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
            }
        };

        if (isTracking) {
            startTracking();
        } else {
            stopTracking();
        }

        return () => stopTracking();
    }, [isTracking]);

    const toggleTracking = () => {
        setIsTracking(!isTracking);
    };

    // Afficher un loader tant que les coordonnées ne sont pas disponibles
    if (!coord) {
        return (
            <div style={{
                width: '100%',
                height: '100vh',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <p>Chargement de la carte...</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        );
    }

    return (
        <div className='position-relative b-0 p-0' style={{ maxHeight: '110vh', height: '100vh' }}>
            {error && (
                <div style={{
                    position: 'absolute',
                    top: '60px',
                    left: '10px',
                    right: '10px',
                    zIndex: 1000,
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px'
                }}>
                    {error}
                </div>
            )}
            
            {/* Bouton pour activer/désactiver le suivi */}
            <button
                onClick={toggleTracking}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 1000,
                    backgroundColor: isTracking ? '#e74c3c' : '#27ae60',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 15px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    fontWeight: 'bold'
                }}
            >
                {isTracking ? '📍 Arrêter suivi' : '🎯 Démarrer suivi'}
            </button>
            
            <Map 
                ref={mapRef} 
                mapLib={maplibregl} 
                initialViewState={{
                    longitude: coord.lon,
                    latitude: coord.lat,
                    zoom: 15,
                    pitch: 60, 
                    bearing: -60,
                }}
                mapStyle="https://api.maptiler.com/maps/positron/style.json?key=RcMak1MP1kaY6o0sBEqb" 
                style={{ width: '100%', height: '100%', border: 'none', padding: 'none' }} 
                onLoad={onLoad}
            >
                <NavigationControl position="top-left" />
                
                {/* Marker de position actuelle */}
                <Marker longitude={coord.lon} latitude={coord.lat} anchor="bottom">
                    <div 
                        style={{
                            backgroundColor: isTracking ? '#e74c3c' : '#95a5a6',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: '2px solid white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                            transform: isTracking ? 'scale(1)' : 'scale(0.8)',
                            transition: 'all 0.3s ease',
                            animation: isTracking ? 'pulse 2s infinite' : 'none'
                        }}
                    />
                </Marker>
                
                {/* Affichage des autres lieux */}
                {places.map((place, index) => {
                    // Debug: afficher les données de chaque place
                    console.log(`Place ${index}:`, place);
                    
                    // Vérifier si address existe et a les bonnes propriétés
                    if (!place.address) {
                        console.log(`Place ${index}: pas d'address`);
                        return null;
                    }
                    
                    // Essayer différentes variantes de noms de propriétés
                    const lon = place.address.longitude || place.address.lon || place.address.lng;
                    const lat = place.address.latitude || place.address.lat;
                    
                    console.log(`Place ${index}: lon=${lon}, lat=${lat}`);
                    
                    // Vérifier que les coordonnées sont valides
                    if (!lon || !lat || isNaN(lon) || isNaN(lat)) {
                        console.log(`Place ${index}: coordonnées invalides`);
                        return null;
                    }
                    
                    return (
                        <Marker 
                            key={`place-${index}`}
                            longitude={Number(lon)} 
                            latitude={Number(lat)} 
                            anchor="bottom"
                        >
                            <div 
                                style={{
                                    backgroundColor: '#3498db',
                                    width: '15px',
                                    height: '15px',
                                    borderRadius: '50%',
                                    border: '2px solid white',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    cursor: 'pointer'
                                }}
                                title={place.name || `Lieu ${index + 1}`}
                            />
                        </Marker>
                    );
                })}
            </Map>
            
            {/* CSS pour l'animation pulse */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes pulse {
                        0% { 
                            transform: scale(1);
                            opacity: 1;
                        }
                        50% { 
                            transform: scale(1.2);
                            opacity: 0.7;
                        }
                        100% { 
                            transform: scale(1);
                            opacity: 1;
                        }
                    }
                `
            }} />
          <Navigation />
            
        </div>
    );
}