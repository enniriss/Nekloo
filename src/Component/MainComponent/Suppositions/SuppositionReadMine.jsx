import CardInfo from "../../Basic/CardInfo";
import { useState, useEffect } from 'react';

export default function SuppositionReadAll() {
    const [suppositions, setSuppositions] = useState([]);
    const userId = localStorage.getItem('id');
    const pseudo = localStorage.getItem('pseudo');
    const token = localStorage.getItem('token');
        
        const fetchSuppositions = async () => {
            try {
                const response = await fetch(`http://localhost:10000/user/${userId}/supposition/read`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}});
                
                const data = await response.json();
                console.log('data', data.data);  
                setSuppositions(data.data);
                
            } catch (error) {
                console.error('Error fetching suppositions:', error);
            }
        };

        console.log("suppositions", suppositions);
        
        
        useEffect(() => {
        fetchSuppositions();
      }, []);
    return (
        <div>
            <h4>{pseudo}</h4>
            {suppositions.map((sup) => (
                <>
                    <CardInfo
                        key={sup.id}
                        title={sup.name}
                        activity={sup.activity}
                        text="Cette page est en cours de développement. Vous pouvez y configurer vos préférences et paramètres personnels."
                    />
                </>
            ))}
        </div>
        
    );
    
}