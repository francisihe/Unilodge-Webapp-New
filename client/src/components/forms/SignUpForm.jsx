import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const SignUpForm = ({ handleChange, handleSubmit, loading }) => {
    return (
        <form className="max-w-md mx-auto mt-6" onSubmit={handleSubmit}>

            <div className="flex gap-2">
                <input
                    type="text"
                    id="firstname"
                    placeholder="Firstname"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    id="lastname"
                    placeholder="Lastname"
                    onChange={handleChange}
                />
            </div>

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
                {loading ? 'Loading...' : 'Sign Up'}
            </button>

            <div className="text-center py-2 text-gray-500">
                Already have an account? <Link className="underline text-black" to={'/signin'}>Sign In</Link>
            </div>
        </form>
    )
}

export default SignUpForm