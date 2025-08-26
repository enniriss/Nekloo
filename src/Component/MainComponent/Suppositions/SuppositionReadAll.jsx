import CardInfo from "../../Basic/CardInfo";
import { useState, useEffect } from 'react';
import Navigation from '../../Basic/Navigation';

export default function SuppositionReadAll() {
    const token = localStorage.getItem('token');
    console.log('token', token);
    
    const [suppositions, setSuppositions] = useState([]);
        
        const fetchSuppositions = async () => {
            try {
                const response = await fetch(`http://localhost:10000/supposition/readall`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${token}`}});
                
                const data = await response.json();
                console.log('data', data.data);  
                setSuppositions(data.data);
                
            } catch (error) {
                console.error('Error fetching suppositions:', error);
            }
        };

        
        
        useEffect(() => {
        fetchSuppositions();
      }, []);
    return (
        <div>
            <a href="/parameters" className="text-decoration-none title" style={{ fontSize: "100px"}}>&lt;</a>
            <h1>Pipi</h1>   
            {suppositions.map((user) => (
                <div className="d-flex justify-content-center">
                {user.suppositions.map((sup) => (
                    <CardInfo
                        key= {sup.id}
                        title={sup.name}
                        activity={sup.activity}
                        pseudo={user.user_info.pseudo}
                        text="Cette page est en cours de développement. Vous pouvez y configurer vos préférences et paramètres personnels."
                    />
                ))}
                </div>
            ))}
            <Navigation />
        </div>
        
    );
    
}