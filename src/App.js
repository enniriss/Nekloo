import React from 'react';
import Map, { NavigationControl, Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
// Note: The 'maplibre-gl/dist/maplibre-gl.css' import is necessary to include the default styles for MapLibre.

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Page/Home';
import About from './About';
import InscriptionForm from './Page/Registration';
import LoginForm from './Page/Login';
import AuthAdmin from './Middleware/AuthAdmin';
import AuthVagabond from './Middleware/AuthVagabond';
import AuthConnected from './Middleware/AuthConnected';
import CustomMap from './Component/Basic/CustomMap';
import SuppositionForm from './Component/MainComponent/SuppositionForm';
import GeocodeSearch from './Page/GeocodeSearch';
import Supposition from './Page/SuppositionCreate';
import Parameters from './Page/Parameters';
import ReadSupposition from './Component/Basic/ReadSupposition';
import ActivityForm from './Component/MainComponent/AcrivityForm';
import SuppositionReadAll from './Component/MainComponent/Suppositions/SuppositionReadAll';
import SuppositionReadMine from './Component/MainComponent/Suppositions/SuppositionReadMine';
import Administration from './Page/Administration';
import Account from './Page/Account';
import PlaceForm from './Component/MainComponent/Place/PlaceForm';
import PlaceReadAll from './Component/MainComponent/Place/PlaceReadAll';
function App() {
  return (
    <Router>
      <nav>
        {/* <Link to="/">Accueil</Link>  <Link to="/about">À propos</Link> */}
      </nav>
      <Routes>
        {/* Access */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<InscriptionForm />} />

        {/* Navigation */}
        <Route path="/" element={<AuthConnected />}><Route index element={<Home />} /></Route>
        <Route path="/about" element={<AuthAdmin />}><Route index element={<About />} /></Route>
        <Route path="/parameters" element={<AuthConnected />} ><Route index element={<Parameters />} /></Route>
        <Route path="/account" element={<AuthConnected />} ><Route index element={<Account/>}/></Route>

        {/* Supposition */}
        <Route path="/supposition/create" element={<AuthVagabond />} ><Route index element={<Supposition />} /></Route>
        <Route path="/supposition/read" element={<AuthVagabond />} ><Route index element={<ReadSupposition />} /></Route>
        <Route path="/supposition/readall" element={<AuthAdmin />} ><Route index element={<SuppositionReadAll />} /></Route>
        <Route path="/supposition/readmine" element={<AuthVagabond />} ><Route index element={<SuppositionReadMine />} /></Route>


        {/* Not used */}
        <Route path="/geocode" element={<AuthVagabond />} ><Route index element={<GeocodeSearch />} /></Route>
        <Route path="/map" element={<AuthConnected />} ><Route index element={<CustomMap />} /></Route>

        {/* Actity */}
        <Route path="/activity/create" element={<AuthAdmin />} ><Route index element={<ActivityForm />} /></Route>

        {/* Adiministration */}
        <Route path="/administration" element={<AuthAdmin />} ><Route index element={<Administration />} /></Route>

        {/* Place */}
        <Route path="/place/create" element={<AuthAdmin />} ><Route index element={<PlaceForm />} /></Route>
        <Route path="/place/readall" element={<AuthAdmin />} ><Route index element={<PlaceReadAll />} /></Route>
      </Routes>
    </Router>
  );
}

export default App;
