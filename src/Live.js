import { useState, useEffect } from 'react';

export default function InscriptionForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    pseudo: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setDebugInfo(null);
    
    // Afficher les données envoyées pour debug
    console.log("Données envoyées:", JSON.stringify(formData, null, 2));
    
    try {
      // Utiliser directement l'URL complète pour le diagnostic
      const response = await fetch('http://127.0.0.1:3000/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
    window.location.href = '/login'; // Route vers laquelle rediriger
  }, 1500);
}else {
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

  // Version simplifiée pour tester
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>
      
      {message && (
        <div className={`p-3 mb-4 rounded ${message.includes('Erreur') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="pseudo" className="block text-sm font-medium text-gray-700 mb-1">
            Pseudo
          </label>
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            value={formData.pseudo}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isLoading ? 'Chargement...' : 'S\'inscrire'}
          </button>
          
        </div>
        <div className="flex space-x-2">
          <a
            href="/login"
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"  >
            Se connecter
          </a>
          
        </div>
      </div>
      
    </div>
  );
}