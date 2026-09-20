import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TryItOutPage from './pages/TryItOutPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/try/:uuid?" element={<TryItOutPage />} />
      </Routes>
    </BrowserRouter>
  )
}
