import NeklooForm from '../Form/NeklooForm';
import Input from '../Form/Input';
import ValidationButton from '../Form/ValidationButton';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import MapTemplate from '../Basic/MapTemplate';

export default function SuppositionForm() {
  const userId = localStorage.getItem('id');
  const [activities, setActivities] = useState([]);

  const [formData, setFormData] = useState({
    address: '',
    name: '',
    activityId: ''
  });

  const fetchActivities = async () => {
        try {
            const response = await fetch(`https://nekloo-api.onrender.com/activity/readall`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }});
            const data = await response.json();
            console.log('data', data.data);  
            setActivities(data.data);
        } catch (error) {console.error('Error fetching suppositions:', error);}};

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [waitLoc, setWaitLoc] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // useEffect pour la géolocalisation initiale
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setWaitLoc({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setError(null);
      },
      (error) => {
        console.error('Erreur géolocalisation:', error);
      }
    );
  }, []); // Pas de dépendances, s'exécute une seule fois

  // useEffect séparé pour le géocodage d'adresse
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (formData.address.length > 3) {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.address)}`)
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
              const newCoords = {
                lat: parseFloat(result.lat),
                lon: parseFloat(result.lon)
              };
              setCoords(newCoords);
              console.log("Nouvelles coordonnées:", newCoords);
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
  }, [formData.address]); // SUPPRIMÉ coords des dépendances !
  useEffect(() => {fetchActivities();}, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setDebugInfo(null);
    const dataToSend = { ...formData }; // On clone d'abord

    console.log("id utilisateur:", userId);

    // Afficher les données envoyées pour debug
    console.log("Données envoyées:", JSON.stringify(dataToSend, null, 2));
    const url = `https://nekloo-api.onrender.com/user/${userId}/supposition/create`;
    console.log("url", url);

    try {
      // Utiliser directement l'URL complète pour le diagnostic
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dataToSend),
      });

      // Capturer les informations de réponse pour le diagnostic
      const responseInfo = {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries([...response.headers.entries()]),
      };

      let data;
      try {
        data = await response.json();
        responseInfo.data = data;
      } catch (parseError) {
        responseInfo.parseError = "Impossible de parser la réponse JSON";
        responseInfo.responseText = await response.text();
      }

      setDebugInfo(responseInfo);
      if (response.ok) {
        setMessage('Inscription réussie ! Redirection...');
        setTimeout(() => {
          window.location.href = '/'; // Route vers laquelle rediriger
        }, 1500);
      } else {
        setMessage(`${data?.error || response.statusText || 'Une erreur est survenue'}`);
      }
    } catch (error) {
      console.error("Erreur de fetch:", error);
      setMessage(`Erreur de connexion: ${error.message}`);
      setDebugInfo({ error: error.toString() });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="row">
        <div className="col-md-12 col-lg-6 b-0 vh-100 h-100 d-flex flex-column align-items-center justify-content-center position-relative overflow-hidden d-none d-lg-block">
          <div className='b-0 p-0 m-0 position-relative' style={{ maxHeight: '110vh', height: '100%' }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Affichage conditionnel amélioré */}
            {coords ? (
              <MapTemplate
                key={`${coords.lat}-${coords.lon}`} // Force le re-render avec une key unique
                lat={coords.lat}
                lon={coords.lon}
              />
            ) : waitLoc ? (
              <MapTemplate
                key={`${waitLoc.lat}-${waitLoc.lon}`}
                lat={waitLoc.lat}
                lon={waitLoc.lon}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <p>Chargement de la carte...</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-12 col-lg-6 w-75-md vh-100 d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden m-0 p-small">
          <NeklooForm title={"Ajouter une supposition"}>
            <p className="text-center mb-4">
              Les suppositions vous permettent d'ajouter une adresse qui vous semble pertinente à ajouter sur Nekloo !
            </p>

            <Input
              property="name"
              printer="Nom"
              value={formData.name}
              onChange={handleChange}
              required={true}
            />

            <Input
              printer="Adresse"
              property="address"
              value={formData.address}
              onChange={handleChange}
              required={true}
            />

            <Form.Group>
              <Form.Label>Catégorie</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="activityId"
                value={formData.activityId}
                onChange={handleChange}
              >
                <option>Choisissez une activité</option>
                {activities.map((activity) => (
                  <option value={activity.id}>
                    {activity.name}
                  </option>))}
              </Form.Select>
            </Form.Group>

            {/* Affichage des coordonnées pour debug */}
            {coords && (
              <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <small>
                  <strong>Coordonnées trouvées :</strong><br />
                  Latitude : {coords.lat}<br />
                  Longitude : {coords.lon}
                </small>
              </div>
            )}

            <div className='d-flex justify-content-center align-items-center'>
              <ValidationButton props={{
                onClick: handleSubmit,
                disabled: isLoading,
                content: isLoading ? "Let's go" : "Let's go",
                id: 'validate'
              }} />
            </div>
          </NeklooForm>
        </div>
      </div>
    </div>
  );
}