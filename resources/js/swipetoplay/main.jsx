import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/index.css'
import 'react-toastify/dist/ReactToastify.css'
import { apiStore } from './store/apiStore/apiStore.js'

const basename =  apiStore.getState().basename;
ReactDOM.createRoot(document.getElementById('root')).render(
      <BrowserRouter basename={basename}>
            <App />
      </BrowserRouter>
)
