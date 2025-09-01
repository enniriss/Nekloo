import { useState, useEffect } from "react";
import LogoutButton from "../Component/MainComponent/LogoutButton";

export default function Account() {
    console.log("Account component loaded");
    
    const [account, SetAccount] = useState(null);
    const userId = localStorage.getItem('id'); 
    const fetchAccount = async () => {
            try {
                const response = await fetch(`https://nekloo-api.onrender.com/user/read/${userId}`, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }});
                
                const data = await response.json();
                SetAccount(data);
                
            } catch (error) {
                console.error('Error fetching suppositions:', error);
            }
        };        
        useEffect(() => {
                fetchAccount();
        }, []);
        
    return (
        <div>
            <a href="/parameters" className="text-decoration-none title" style={{ fontSize: "100px"}}>&lt;</a>
            <div style={{ padding: '20px', maxWidth: '400px' }}>
                <h2>{account ? account.pseudo : ""}</h2>
                <p>Cette page est en cours de développement. Vous pouvez y configurer vos préférences et paramètres personnels.</p>
            </div>

            <LogoutButton />
        </div>
    );
}