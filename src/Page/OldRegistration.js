import { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import Input from "../Component/Form/Input";
import RegistrationForm from "../Component/RegistrationForm";
import Background from '../Component/Basic/Background';
export default function Registration() {
  // Version simplifiée pour tester
  return (<div class="hello">
    <Container fluid className="p-0">

      <div className="row p-0 b-0">
        <div className="col-md col-lg b-0 vh-100 w-100  h-100 d-flex flex-column align-items-center justify-content-center position-relative py-5 overflow-hidden">
          <Background />
          <div className="box">
            <div className='filter-layer'></div>
            <img src="/assets/logo.png" className='logo' alt="" />
          </div>
        </div>
        <div className="col-md col-lg vh-100 d-flex flex-column align-items-center justify-content-center position-relative p-3 b-0 overflow-hidden m-0">
          <RegistrationForm />
        </div>
      </div>
    </Container>
  </div>
  );
}