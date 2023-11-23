import AppContextProvider from 'context/AppContext'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Modals from 'Modals'
import ModalContextProvider from 'context/modals/ModalContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <ModalContextProvider>
        <>
          <Modals />
          <App />
        </>
      </ModalContextProvider>
    </AppContextProvider>
  </React.StrictMode>
)
