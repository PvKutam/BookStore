import React from 'react';
import { FirebaseProvider } from "./Context/Firebase"
import { BrowserRouter } from "react-router-dom"
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <BrowserRouter>  
      <App />
      </BrowserRouter>
    </FirebaseProvider>
  </React.StrictMode>
);


