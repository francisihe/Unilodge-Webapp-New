import { Route, Routes } from "react-router-dom"


const Profile = () => {
  return (
    <div>
      Profile

      [Add a notice to select a username and click update]
      [The update process also automatically updates and
      links old bookings when user was not signed up to the users profile]

      {/* Views According To Path */}
      <Routes>
        <Route path='/' 
        element={<div>Regular Profile</div>}/>

        <Route path='/bookings'
        element={<div>Bookings here</div>} />

      </Routes>

    </div>
  )
}

export default Profile