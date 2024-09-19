import { } from 'react'
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import './App.css'

function App() {

  
    
  










  


  return (
    <>
    
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route exact path="/ChatPage" element={<ChatPage />} />
        
      </Routes>
      </div>
      
    </>
  )
}

export default App
