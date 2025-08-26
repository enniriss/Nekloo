// 📁 src/hooks/useSubmitForm.js
import { useState } from 'react';

export default function LogicForm({ endpoint, onSuccess, onError, method, redirection }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [debugInfo, setDebugInfo] = useState(null);

  const userId = localStorage.getItem('id');

  const submit = async (formData) => {
    setIsLoading(true);
    setMessage('');
    setDebugInfo(null);

    const url = `http://127.0.1:3000/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
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
      } catch {
        responseInfo.parseError = 'Impossible de parser le JSON';
        responseInfo.responseText = await response.text();
      }

      setDebugInfo(responseInfo);

      if (response.ok) {
        setMessage('Succès ✅');
        if (onSuccess) onSuccess(data);
        console.log("siez", redirection.length);
        
        if (redirection.length != 0) {
            setTimeout(() => {
                window.location.href = redirection; // Route vers laquelle rediriger
            }, 1500);
        }

      } else {
        setMessage(data?.error || 'Erreur serveur');
        if (onError) onError(data);
      }
    } catch (err) {
      setMessage('Erreur de connexion');
      setDebugInfo({ error: err.toString() });
      if (onError) onError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, message };
}
