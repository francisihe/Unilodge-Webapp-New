import './App.css'
import { Route, Routes } from 'react-router-dom'

import Layout from './pages/Layout'
import Home from './pages/Home'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}/>
        <Route index element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
