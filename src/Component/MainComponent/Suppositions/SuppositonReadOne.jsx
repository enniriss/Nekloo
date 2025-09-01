import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NeklooForm from "../../Form/NeklooForm";
import Input from "../../Form/Input";
import { Form } from 'react-bootstrap';
import ValidationButton from "../../Form/ValidationButton";
import AddressInput from "../../Form/AddressInput";

export default function SuppositionReadOne() {
    const { userId, suppositionId } = useParams();

    const [suppositions, setSuppositions] = useState(null);
    const [activities, setActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    
    // État du formulaire avec structure complète
    const [formData, setFormData] = useState({
        name: '',
        activityId: '',
        address: {
            full_address: '',
            lat: '',
            lon: '',
            country: '',
            city: '',
            postcode: '',
            suburb: '',
            road: '',
            house_number: ''
        }
    });

    const token = localStorage.getItem('token');
    
    // Fonction pour récupérer les données de la supposition
    const fetchSuppositions = async () => {
        try {
            const response = await fetch(`https://nekloo-api.onrender.com/user/${userId}/supposition/read/${suppositionId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('data', data.data);  
            setSuppositions(data.data);
            
            // Pré-remplir le formulaire avec les données récupérées
            if (data.data) {
                setFormData({
                    name: data.data.name || '',
                    activityId: data.data.activityId || '',
                    address: {
                        full_address: data.data.address?.full_address || '',
                        lat: data.data.address?.lat || '',
                        lon: data.data.address?.lon || '',
                        country: data.data.address?.country || '',
                        city: data.data.address?.city || '',
                        postcode: data.data.address?.postcode || '',
                        suburb: data.data.address?.suburb || '',
                        road: data.data.address?.road || '',
                        house_number: data.data.address?.house_number || ''
                    }
                });
            }
            
        } catch (error) {
            console.error('Error fetching suppositions:', error);
            setMessage('Erreur lors du chargement des données de la supposition.');
        }
    };

    // Fonction pour récupérer les activités (si nécessaire)
    const fetchActivities = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:10000/activities`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setActivities(data.data || []);
            
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    // Gestionnaire pour les champs simples
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Gestionnaire pour les objets imbriqués (comme address)
    const handleDicoChange = (parentKey, childKey, value) => {
        setFormData(prev => ({
            ...prev,
            [parentKey]: {
                ...prev[parentKey],
                [childKey]: value
            }
        }));
    };

    // Gestionnaire de soumission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Logique de soumission ici
            console.log('Données à soumettre:', formData);
            
            // Exemple d'appel API pour créer/modifier l'activité
            const response = await fetch(`http://127.0.0.1:10000/user/${userId}/activity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            setMessage('Activité créée avec succès !');
            console.log('Résultat:', result);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('Erreur lors de la soumission du formulaire.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSuppositions();
        fetchActivities(); // Charger les activités disponibles
    }, [userId, suppositionId]);

    console.log("suppositions", suppositions);
    console.log("formData", formData);

    return (
        <div className="row">
            <div className="col-12 vh-100 d-flex justify-content-center align-items-center overflow-hidden m-0">
                <div className="w-50">
                    <NeklooForm title="Ajouter une activité">
                        {message && (
                            <div className={`alert ${message.includes('succès') ? 'alert-success' : 'alert-danger'}`}>
                                {message}
                            </div>
                        )}
                        
                        <Input 
                            property="name"
                            printer="Nom"
                            value={formData.name}
                            onChange={handleChange}
                            required={true}
                        />

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
                            }}
                        />

                        <Form.Group>
                            <Form.Label>Activité</Form.Label>
                            <Form.Select
                                aria-label="Sélectionner une activité"
                                name="activityId"
                                value={formData.activityId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionnez une activité</option>
                                {activities.map((activity) => (
                                    <option key={activity.id} value={activity.id}>
                                        {activity.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <div className='d-flex justify-content-center align-items-center'>
                            <ValidationButton props={{
                                onClick: handleSubmit,
                                disabled: isLoading,
                                content: isLoading ? "Chargement..." : "Let's go",
                                id: 'validate'
                            }} />
                        </div>
                    </NeklooForm>
                </div>
            </div>
        </div>
    );
}