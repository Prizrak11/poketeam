import SearchModal from 'components/SearchModal/SearchModal'
import AppContextProvider from 'context/AppContext'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ReactToolTip from 'react-tooltip'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReactToolTip />
    <AppContextProvider>
      <>
        <SearchModal />
        <App />
      </>
    </AppContextProvider>
  </React.StrictMode>
)
