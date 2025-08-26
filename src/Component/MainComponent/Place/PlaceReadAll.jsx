import CardInfo from "../../Basic/CardInfo";
import { useState, useEffect } from 'react';
import Navigation from '../../Basic/Navigation';

export default function PlaceReadAll() {
    const token = localStorage.getItem('token');
        console.log('token', token);
        
        const [places, setPlaces] = useState([]);
            
            const fetchPlaces = async () => {
                try {
                    const response = await fetch(`http://localhost:10000/places/readall`, {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${token}`}});
                    
                    const data = await response.json();
                    console.log('data', data.data);  
                    setPlaces(data.data);
                    
                } catch (error) {
                    console.error('Error fetching suppositions:', error);
                }
            };
    
            
            
            useEffect(() => {fetchPlaces();}, []);
        return (
            <div>
                <a href="/parameters" className="text-decoration-none title" style={{ fontSize: "100px"}}>&lt;</a>
                    <div className="d-flex justify-content-center">
                    {places.map((pl) => (
                        <h1>{pl.name}</h1>
                        // <CardInfo
                        //     key= {sup.id}
                        //     title={sup.name}
                        //     activity={sup.activity}
                        //     pseudo={user.user_info.pseudo}
                        //     text="Cette page est en cours de développement. Vous pouvez y configurer vos préférences et paramètres personnels."
                        // />
                    ))}
                    </div>
                <Navigation />
            </div>
            
        );
}