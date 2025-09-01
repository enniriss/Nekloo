import NeklooForm from "../../Form/NeklooForm";
import Input from "../../Form/Input";
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import ValidationButton from "../../Form/ValidationButton";
import AddressInput from "../../Form/AddressInput";

export default function PlaceForm() {
    const [activities, setActivities] = useState([]);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [debugInfo, setDebugInfo] = useState(null);
    const [error, setError] = useState(null);
    const fetchActivities = async () => {
        try {
            const response = await fetch(`https://nekloo-api.onrender.com/activity/readall`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}});
            const data = await response.json();
            console.log('data', data.data);  
            setActivities(data.data);
        } catch (error) {console.error('Error fetching suppositions:', error);}};

    const [formData, setFormData] = useState({
            name: '',
            address: {
                lat: 0,
                lon: 0,
                country: '',
                city: '',
                postcode: '',
                full_address: '',
                suburb: '',
                road: '',
                house_number: ''
            },
            activityId: ''
        });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value}));};

    const handleDicoChange = (key, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: {
            ...prev.address,
            [field]: value}}));};
    const [coords, setCoords] = useState(null);
        
    console.log('formData', formData); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setDebugInfo(null);
        const dataToSend = { ...formData }; // On clone d'abord

    const url = `http://127.0.1:3000/places/create`;

    try {
      // Utiliser directement l'URL complète pour le diagnostic
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

        
        
    useEffect(() => {fetchActivities();}, []);
        
    return (
        <div className="row">
        <div className="col-12 vh-100 d-flex justify-content-center align-items-center overflow-hidden m-0">
        <div className="w-50">
        <NeklooForm title="Ajouet une activité">
            {message}
            <Input property="name"
              printer="Nom"
              value={formData.name}
              onChange={handleChange}
              required={true}/>


            <AddressInput
                value={formData.address.full_address}
                onChange={(e) => handleDicoChange("address", "full_address", e.target.value)}
                required={true}
                onCoordsChange={(newCoords) => {
                if (newCoords) {
                    handleDicoChange("address", "lat", newCoords.lat);
                    handleDicoChange("address", "lon", newCoords.lon);
                    handleDicoChange("address", "country", newCoords.country);
                    handleDicoChange("address", "city", newCoords.city);
                    handleDicoChange("address", "postcode", newCoords.postcode);
                    handleDicoChange("address", "suburb", newCoords.suburb);
                    handleDicoChange("address", "road", newCoords.road);
                    handleDicoChange("address", "house_number", newCoords.house_number);
                }
                }}/>

            <Form.Group>
              <Form.Label>Activité</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="activityId"
                value={formData.activityId}
                onChange={handleChange}
              >
                <option>Open this select menu</option>
                {activities.map((activity) => (
                  <option value={activity.id}>
                    {activity.name}
                  </option>))}
              </Form.Select>
            </Form.Group>


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