import React from 'react'; 
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom'; 
import App from './App.tsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

// 1. Obtém o elemento raiz
const rootElement = document.getElementById('root');


if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
      <BrowserRouter>
        {/* Envolve toda a aplicação com o AuthProvider para gerenciar o token na memória */}
        
          <App />
      </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Não foi possível encontrar o elemento com ID 'root'.");
}