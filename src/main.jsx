import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MortgageCalculator from './MortgageCalculator'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MortgageCalculator />
  </StrictMode>,
)
