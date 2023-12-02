import { Link, Outlet } from "react-router-dom"

const DashboardAdmin = () => {
  return (
    <div className="flex flex-col my-4 space-y-3 lg:mx-auto lg:w-screen lg:max-w-screen-xl">
      {/* Menu Nav */}
      <div className="my-2 flex items-center gap-2 text-orange-700">
        <Link to='/admin'><p>Dashboard</p></Link>
        <p className="text-black">&#124;</p>
        <Link to='/admin/bookings'><p>Bookings</p></Link>
        <p className="text-black">&#124;</p>
        <Link to='/admin/properties'><p>Properties</p></Link>
        <p className="text-black">&#124;</p>
        <Link to='/admin/users'><p>Users</p></Link>
      </div>

      <div className="my-3">
        <h1 className="text-3xl">Admin Dashboard</h1>
      </div>

      {<Outlet />}
    </div>
  )
}

export default DashboardAdmin