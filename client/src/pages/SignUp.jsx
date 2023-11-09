import { Link } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";


const SignUp = () => {

  const handleChange = (event) => {
    console.log(event)
  };

  const handleSubmit = (event) => {
    console.log(event)
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Create account</h1>

        <GoogleAuthButton />

        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="John Doe"
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="your@email.com"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="password"
            onChange={handleChange}
          />

          <button className="bg-orange-600 p-2 w-full text-white rounded-2xl">Sign Up</button>

          <div className="text-center py-2 text-gray-500">
            Already have an account? <Link className="underline text-black" to={'/signin'}>Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp