import './App.css'
import { Route, Routes } from 'react-router-dom'

import Layout from './pages/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Footer from './components/UI/Footer'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
