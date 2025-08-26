import { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import Input from "../Form/Input";
import ValidationButton from '../Form/ValidationButton';
import Link from '../Basic/Link';
export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    pseudo: '',
    confirmPassword: '',
    birthDate: '',
  });
  const [step, setStep] = useState(1);

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
  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setDebugInfo(null);
    const dataToSend = { ...formData }; // On clone d'abord
    delete dataToSend.confirmPassword;

    // Afficher les données envoyées pour debug
    console.log("Données envoyées:", JSON.stringify(dataToSend, null, 2));

    try {
      // Utiliser directement l'URL complète pour le diagnostic
      const response = await fetch('http://127.0.0.1:3000/user/create', {
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
          window.location.href = '/login'; // Route vers laquelle rediriger
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

  // Version simplifiée pour tester
  return (
    <Container className="d-flex justify-content-center align-items-center h-100 w-100" style={{ padding: '0', margin: '0' }}>
      <Card className="p-4 shadow-sm form border-0 rounded-5 shadow-lg" style={{ width: '100%', height: 'auto' }}>
        <h2 className="text-center mb-4">Connexion</h2>

        {message && (
          <div className={`p-3 mb-4 rounded ${message.includes('Erreur') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          {step === 1 && (
            <>
              <Input
                property="email"
                value={formData.email}
                onChange={handleChange}
                required={true}
              />
              {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                <div className="text-danger text-sm mt-2 text-center">
                  L'adresse email n'est pas valide.
                </div>
              )
              }
              <Input
                property="password"
                printer="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                required={true}
              />
              <Input
                property="confirmPassword"
                type="password"
                printer="Confirmation de mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={true}
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <div className="text-danger text-sm mt-2 text-center">
                  Les mots de passe ne sont pas identiques.
                </div>
              )}

              <div className="d-flex justify-content-center mt-3">
                <ValidationButton props={{
                  onClick: nextStep,
                  disabled:
                    !formData.email ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ||
                    !formData.password ||
                    !formData.confirmPassword ||
                    formData.password !== formData.confirmPassword,
                  content: "La suite...",
                  id: 'next'
                }} type="next" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <Input
                property="pseudo"
                value={formData.pseudo}
                onChange={handleChange}
                required={true}
              />
              <Input
                property="birthDate"
                type="date"
                printer="Votre date de naissance"
                value={formData.birthDate}
                onChange={handleChange}
                required={true}
              />



              <div className="d-flex justify-content-between mt-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className="py-2 px-4 rounded-md prevStep"
                >
                  La suite
                </button>
                <ValidationButton props={{
                  onClick: handleSubmit,
                  disabled: isLoading,
                  content: isLoading ? "Let's go" : "Let's go",
                  id: 'validate'
                }} />
              </div>
            </>
          )}
          <Link />
        </div>
      </Card>
    </Container>
  );
}