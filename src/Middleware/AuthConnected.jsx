import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthConnected() {
  const userRole = localStorage.getItem("role");
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if ((userRole === "vagabond" || userRole === "admin") && userToken) {
      return;
    } else if (userToken) {
      console.log("Accès refusé : Un token mais rien d'existant");
      navigate("/login"); 
    } else {
      console.log("Accès refusé : non authentifié");
      navigate("/login"); // Rediriger vers la page de connexion
    }
  }, [userRole, userToken, navigate]);
  
  if ((userRole === "vagabond" || userRole === "admin") && userToken) {
    return <Outlet />;
  }

  // Si pas encore redirigé (pendant le useEffect), ne rien afficher
  return null;
}