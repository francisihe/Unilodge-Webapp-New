import { Link } from "react-router-dom"


// eslint-disable-next-line react/prop-types
const SignInForm = ({ handleChange, handleSubmit, loading }) => {
    return (
        <form className="max-w-md mx-auto mb-6" onSubmit={handleSubmit}>
            {/* <span className="text-green-700 text-sm">
              Please fill in your email and password.
            </span> */}

            <input
                type="email"
                id="email"
                placeholder="your@email.com"
                onChange={handleChange}
                required
            />

            <input
                type="password"
                id="password"
                placeholder="password"
                onChange={handleChange}
                required
            />

            <button
                disabled={loading}
                className="bg-orange-600 p-2 w-full text-white rounded-2xl">
                {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="text-center py-2 text-gray-500">
                Do not have an account? <Link className="underline text-black" to={'/signup'}>Sign Up</Link>
            </div>
        </form>
    )
}

export default SignInForm