import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'

import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Map from './pages/Map'

import './App.css'


function AppContent() {
  const location = useLocation()

  return (
    <>
    {location.pathname !== '/map' && <Header/>}
      <Routes>
          <Route path ="/" element={<Home/>}/>
          <Route path ="/jabout" element={<About/>}/>
          <Route path ="/map" element={<Map/>}/>
        </Routes>
    </>
  )
}

function App() {


  return (
      <BrowserRouter>
        <AppContent/>

        
        
      </BrowserRouter>
  
  )
}

export default App
