import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Contact from './pages/Contact'
import CardPreview from './pages/CardPreview'
import UserPreview from './pages/UserPreview'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/share/reading-card/:id" element={<CardPreview />} />
        <Route path="/share/profile/:token" element={<UserPreview />} />
        <Route path="/user/:id" element={<UserPreview />} />
      </Routes>
    </BrowserRouter>
  )
}
