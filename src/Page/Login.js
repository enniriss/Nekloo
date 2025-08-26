import { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import Input from "../Component/Form/Input";
import LoginForm from "../Component/MainComponent/LoginForm";
import Background from '../Component/Basic/Background';
export default function Login() {
  // Version simplifiée pour tester
  return (
    <div className="p-0 b-0">
      <div className="row p-0 b-0">
        <div className="col-md-12 col-lg-6 b-0 vh-100 h-100 d-flex flex-column align-items-center justify-content-center position-relative py-5 overflow-hidden">

          <Background />
          <div className="box">
            <div className='filter-layer'></div>
            <img src="/assets/logo.png" className='logo' alt="" />
          </div>
        </div>
        <div className="col-md-12 col-lg-6 w-50-md vh-100 d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden m-0 p-small">
          <LoginForm />
        </div>
      </div>
    </div>

  );
}