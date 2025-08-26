import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthVagabond() {
  const userRole = localStorage.getItem("role");
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole === "vagabond" && userToken) {
      return;
    } else if (userToken) {
      console.log("Accès refusé : vagabond non admin");
      navigate("/login"); 
    } else {
      console.log("Accès refusé : vagabond non authentifié");
      navigate("/login"); // Rediriger vers la page de connexion
    }
  }, [userRole, userToken, navigate]);

  if (userRole === "vagabond" && userToken) {
    return <Outlet />;
  }

  // Si pas encore redirigé (pendant le useEffect), ne rien afficher
  return null;
}