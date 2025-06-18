import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ContactModal from './components/ContactModal'

function App() {
  const [credits, setCredits] = useState(() => {
    const savedCredits = localStorage.getItem('credits')
    return savedCredits ? parseInt(savedCredits) : 10
  })
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('credits', credits.toString())
  }, [credits])

  const handleGenerateImage = () => {
    if (credits > 0) {
      setCredits(prev => prev - 1)
      // Image generation logic will be added here
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar 
          credits={credits} 
          onContactClick={() => setIsContactModalOpen(true)} 
        />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  credits={credits} 
                  onGenerateImage={handleGenerateImage} 
                />
              } 
            />
          </Routes>
        </main>
        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />
      </div>
    </Router>
  )
}

export default App 