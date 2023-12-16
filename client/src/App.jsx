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
import UserBookings from './pages/UserBookings'
import SearchProperties from './pages/SearchProperties'
import DashboardAdmin from './pages/admin/DashboardAdmin'
import BookingsAdmin from './pages/admin/BookingsAdmin'
import PropertiesAdmin from './pages/admin/PropertiesAdmin'
import Users from './pages/admin/Users'
import ProfileForm from './components/forms/ProfileForm'
import DashboardSummary from './pages/admin/DashboardSummary'
import Page404 from './pages/Page404'
import VerifyUser from './routes/VerifyUser'
import VerifyAdminOrManager from './routes/VerifyAdminOrManager'
import About from './pages/About'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './components/UIskeleton/BlogPost'
import Shop from './pages/Shop'



function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='/profile/*' element={<VerifyUser> <Profile /> </VerifyUser>}> {/* User Protected Route */}
            <Route index element={<ProfileForm />} />
            <Route path='bookings' element={<UserBookings />} />
          </Route>

          <Route path='/admin/*' element={<VerifyAdminOrManager> <DashboardAdmin /> </VerifyAdminOrManager>} > {/* Manager Protected Route */}
            <Route index element={<DashboardSummary />} />
            <Route path='bookings' element={<BookingsAdmin />} />
            <Route path='properties' element={<PropertiesAdmin />} />
            <Route path='users' element={<Users />} /> {/* Admin Protected Route */}
          </Route>

          <Route path='/signup/*' element={<SignUp />} /> {/* Has the verify sub page within */}
          <Route path='/signin/*' element={<SignIn />} /> {/* Has the verify sub page within */}
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/blog/*' element={<Blog />} />
          <Route path='/blog/:slug' element={<BlogPost />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/404' element={<Page404 />} />

          <Route path='/properties' element={<Properties />} />
          <Route path='/search-properties' element={<SearchProperties />} />
          <Route path='/add-property' element={<VerifyAdminOrManager> <AddProperty /> </VerifyAdminOrManager>} /> {/* Manager Protected Route */}
          <Route path='/edit-property/:propertyId' element={<VerifyAdminOrManager> <EditProperty /> </VerifyAdminOrManager>} /> {/* Manager Protected Route */}
          <Route path='/property/:propertyId' element={<PropertyListing />} />

          <Route path='*' element={<Page404 />} />

        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
