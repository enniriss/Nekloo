import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import Input from '../Form/Input';
import Link from '../Basic/Link';
import ValidationButton from '../Form/ValidationButton';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  const navigate = useNavigate();

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

    console.log("Tentative de connexion avec:", JSON.stringify(formData, null, 2));

    try {
      const response = await fetch('http://127.0.0.1:10000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

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
        // IMPORTANT: Vérifier que data contient bien ce que nous attendons

        if (data && data.token) {

          console.log(data);

          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.user_data.email);
          localStorage.setItem("pseudo", data.user_data.pseudo);
          localStorage.setItem("id", data.user_data.id);
          localStorage.setItem("role", data.role);

          setMessage('Connexion réussie ! Redirection...');

          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          setMessage('Connexion réussie mais aucun token reçu.');
        }
      } else {
        setMessage(`${data?.error || response.statusText || 'Identifiants incorrects'}`);
      }
    } catch (error) {
      console.error("Erreur de fetch:", error);
      setMessage(`Erreur de connexion: ${error.message}`);
      setDebugInfo({ error: error.toString() });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center h-100 w-100" style={{ padding: '0', margin: '0' }}>
      <Card className="p-4 shadow-sm form border-0 rounded-5 shadow-lg" style={{ width: '100%', height: 'auto' }}>
        <h2 className="text-center mb-4">Connexion</h2>

        {message && (
          <Alert variant={message.includes('Erreur') || message.includes('incorrects') ? 'danger' : 'success'}>
            {message}
          </Alert>
        )}

        <Form>
          <Input
            property="email"
            value={formData.email}
            onChange={handleChange}
            required={true}
            type="email"
          />
          <Input
            property="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
            type="password"
            printer="Mot de passe" />
          <div className="d-flex justify-content-center">
            <ValidationButton props={{
              onClick: handleSubmit,
              disabled: isLoading,
              content: isLoading ? "Let's go" : "Let's go",
              id: 'validate'
            }} />
          </div>
          <Link content="S'inscrire" href="/register" />
        </Form>
      </Card>
    </Container>
  );
}