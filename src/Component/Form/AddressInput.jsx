import { useState, useEffect } from 'react';
import Input from '../Form/Input';

export default function AddressInput({ value, onChange, onCoordsChange, required }) {
    
  const [coords, setCoords] = useState(null);
  const [full_address, setFullAddress] = useState('');
  const [error, setError] = useState(null);

  // Recherche automatique avec debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (value && value.length > 3) {
        // fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`)
        fetch(`https://nominatim.openstreetmap.org/search?addressdetails=1&format=json&q=${encodeURIComponent(value)}`)
          .then(res => {
            if (!res.ok) throw new Error('Erreur lors de la requête');
            return res.json();
          })
          .then(data => {
            if (!data.length) {
              setCoords(null);
              setError('Adresse introuvable');
              onCoordsChange?.(null);
            } else {
              console.log("recup data", data);
              console.log("Recup house_number", data[0].address.house_number);
              console.log("Recup road", data[0].address.road);
              console.log("Recup suburb", data[0].address.suburb);
              
              
              const newCoords = {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
                full_address: data[0].display_name,
                country: data[0].address.country || '',
                city: data[0].address.city || data[0].address.town || data,
                postcode: data[0].address.postcode || '',
                suburb: data[0].address.suburb || '',
                road: data[0].address.road || '',
                house_number: data[0].address.house_number || '',
                
              };
              setCoords(newCoords);
              setFullAddress(data[0].display_name);
              setError(null);
              onCoordsChange?.(newCoords);
            }
          })
          .catch(err => {
            setError(err.message);
            setCoords(null);
            onCoordsChange?.(null);
          });
      } else {
        setCoords(null);
        setError(null);
        onCoordsChange?.(null);
      }
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [value, onCoordsChange]);

  return (
    <div>
      <Input
        printer="Adresse"
        property="address"
        value={value}
        onChange={onChange}
        required={required}
      />
      {error && <small className="text-danger">{error}</small>}
      {coords && (
        <small className="text-muted">
          Adresse trouvées: {full_address}
        </small>
      )}
    </div>
  );
}
