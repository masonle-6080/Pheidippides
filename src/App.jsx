import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Map from './pages/Map'

import './App.css'

function App() {

  return (
      <BrowserRouter>
        <Header/>

        <Routes>
          <Route path ="/" element={<Home/>}/>
          <Route path ="/about" element={<About/>}/>
          <Route path ="/map" element={<Map/>}/>
        </Routes>
        
      </BrowserRouter>
  
  )
}

export default App
