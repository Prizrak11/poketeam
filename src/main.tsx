import AppContextProvider from 'context/AppContext'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ReactToolTip from 'react-tooltip'
import './index.css'
import Modals from 'Modals'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReactToolTip />
    <AppContextProvider>
      <>
        <Modals />
        <App />
      </>
    </AppContextProvider>
  </React.StrictMode>
)
