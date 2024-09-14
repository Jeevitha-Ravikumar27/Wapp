import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App.jsx'
import './index.css'
import { Wapp } from './Wapp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  {/*  <App /> */}
  < Wapp/>
  </StrictMode>,
)
