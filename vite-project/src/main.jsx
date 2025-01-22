import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LineChart from './components/LineChart'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Route path='/line' element 
    <App />
  </StrictMode>,
)
