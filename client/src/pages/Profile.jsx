import { Link, Outlet } from "react-router-dom"


const Profile = () => {
  return (
    <div className="flex flex-col my-4 space-y-3 lg:mx-auto lg:w-screen lg:max-w-screen-xl">
      <div className="my-2 flex items-center gap-2 text-orange-700">
        <Link to='/profile'><p>Profile</p></Link>
        <p className="text-black">&#124;</p>
        <Link to='/profile/bookings'><p>Bookings</p></Link>
      </div>

      <div className="my-3">
        <h1 className="text-3xl">Profile Page</h1>
        <p>Welcome to your profile page</p>
      </div>

      {<Outlet />}

    </div>
  )
}

export default Profile