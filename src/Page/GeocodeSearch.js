import React, { useState, useEffect } from 'react';

const GeocodeSearch = () => {
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (address.length > 3) {
        fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error('Erreur lors de la requête');
            }
            return response.json();
          })
          .then((data) => {
            if (data.length === 0) {
              setCoords(null);
              setError('Adresse introuvable');
            } else {
              const result = data[0];
              setCoords({ lat: result.lat, lon: result.lon });
              setError(null);
            }
          })
          .catch((err) => {
            setError(err.message);
            setCoords(null);
          });
      } else {
        setCoords(null);
        setError(null);
      }
    }, 800); // délai de 800ms

    return () => clearTimeout(delayDebounce);
  }, [address]);

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Recherche automatique d'adresse</h2>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Entrez une adresse"
        style={{ width: '100%', marginBottom: '10px' }}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {coords && (
        <div style={{ marginTop: '10px' }}>
          <p>Latitude : {coords.lat}</p>
          <p>Longitude : {coords.lon}</p>
        </div>
      )}
    </div>
  );
};

export default GeocodeSearch;
