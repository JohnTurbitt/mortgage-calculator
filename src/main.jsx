import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MortgageCalculator from './MortgageCalculator'
import Extras from './Extras'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="calculator-page">
      <MortgageCalculator />
      <Extras />
    </div>
  </StrictMode>,
)
