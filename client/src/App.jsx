import './App.css'
import { Route, Routes } from 'react-router-dom'

import Layout from './pages/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import AddProperty from './pages/AddProperty'
import EditProperty from './pages/EditProperty'
import Properties from './pages/Properties'
import Footer from './components/UI/Footer'
import PropertyListing from './components/UIskeleton/PropertyListing'
import UserBookings from './components/UIskeleton/UserBookings'
import SearchProperties from './pages/SearchProperties'
import DashboardAdmin from './pages/admin/DashboardAdmin'



function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='/profile/*' element={<Profile />}> {/* Protect Route */}
            <Route path='bookings' element={<UserBookings />} />
          </Route>

          <Route path='/admin' element={<DashboardAdmin />} />

          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/properties' element={<Properties />} />
          <Route path='/search-properties' element={<SearchProperties />} />
          <Route path='/add-property' element={<AddProperty />} /> {/* Protect Route */}
          <Route path='/edit-property/:propertyId' element={<EditProperty />} /> {/* Protect Route */}
          <Route path='/property/:propertyId' element={<PropertyListing />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
