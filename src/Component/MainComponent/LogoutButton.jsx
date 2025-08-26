import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicButton from "../../Component/Basic/BasicButton";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogout = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // Récupérer le token pour l'envoyer au serveur
      const token = localStorage.getItem("token");

      const response = await fetch('http://127.0.0.1:3000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Envoyer le token pour identifier l'utilisateur
        },
        body: JSON.stringify({}) // Corps vide ou données nécessaires pour la déconnexion
      });

      if (response.ok) {
        // Déconnexion réussie côté serveur
        localStorage.clear(); // Nettoyer le localStorage
        setMessage('Déconnexion réussie ! Redirection...');

        setTimeout(() => {
          navigate('/'); // Rediriger vers la page d'accueil
        }, 1000);
      } else {
        const data = await response.json();
        setMessage(`Erreur de déconnexion: ${data?.error || response.statusText}`);

        // Même en cas d'erreur serveur, on peut nettoyer le localStorage local
        localStorage.clear();
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
      setMessage(`Erreur de connexion: ${error.message}`);

      // En cas d'erreur réseau, nettoyer quand même le localStorage
      localStorage.clear();
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <BasicButton
        onClick={handleLogout}
        description={isLoading ? "Déconnexion..." : "Déconnexion"}
        disabled={isLoading}
        className="bg-peps"
        style={{backgroundColor: 'white'}}
      />
      {message && <p style={{ marginTop: '10px', fontSize: '14px' }}>{message}</p>}
    </div>
  );
}