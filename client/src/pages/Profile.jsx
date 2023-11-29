import { Route, Routes } from "react-router-dom"
import ProfileForm from "../components/forms/ProfileForm"


const Profile = () => {
  return (
    <div className="flex flex-col my-4 space-y-3 lg:mx-auto lg:w-screen lg:max-w-screen-xl">
      <div className="my-3">
        <h1 className="text-3xl">Profile Page</h1>
        <br />
        <p>Welcome to your profile page.<br />
          You can create your username, update your personal details and see your past and future bookings here</p>
      </div>

      {/* Views According To Path */}
      <Routes>
        <Route path='/'
          element={<ProfileForm />} />

        <Route path='/bookings'
          element={<div>Bookings here</div>} />

      </Routes>

    </div>
  )
}

export default Profile