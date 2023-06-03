import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TestmodeContextProvider } from './Context/TestModeContext';
import { ThemeContextProvider } from './Context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <TestmodeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TestmodeContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);


