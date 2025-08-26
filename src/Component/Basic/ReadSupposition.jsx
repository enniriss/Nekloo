import CardInfo from "./CardInfo";
import Navigation from "./Navigation";
import { useState, useEffect } from 'react';

export default function ReadSupposition() {
    const userId = localStorage.getItem('id');
    const [suppositions, setSuppositions] = useState([]);
    
    const fetchSuppositions = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/${userId}/supposition/read`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}});
            
            console.log('response', response);
            const data = await response.json();
            console.log('data', data.data);  
            setSuppositions(data.data);
            console.log("suppositions", suppositions);
            
        } catch (error) {
            console.error('Error fetching suppositions:', error);
        }
    };

    useEffect(() => {
    fetchSuppositions();
  }, []);

    return (
        <div>
        <h1>CAC</h1>

        {suppositions.map((sup) => ( //react's for loop

        <CardInfo
                title={sup.name}
                activity={sup.activity}
                text="Cette page est en cours de développement. Vous pouvez y configurer vos préférences et paramètres personnels."
            />
        

        ))}
        <Navigation />
    </div>
    );
}