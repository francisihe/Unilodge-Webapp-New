import { Link, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useState } from "react";
import SignInForm from "../components/forms/SignInForm";
import { FiMail } from "react-icons/fi";

const SignIn = () => {

  const [formData, setFormData] = useState({});
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const revealSignInForm = () => {
    setShowSignInForm(!showSignInForm);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/profile');

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }

    console.log(formData);
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64 text-center">
        <h1 className="text-4xl text-center mb-4">Sign In</h1>

        <button
          onClick={revealSignInForm}
          className='w-full border-2 border-black my-1 py-2 px-3 rounded-2xl 
        hover:bg-blue-500 hover:text-white hover:scale-95 transition-transform'
        >
          <div className='flex items-center justify-center gap-3'>
            <span className='text-xl'><FiMail /></span>
            <span>Sign In With Email and Password</span>
          </div>
        </button>

        {error && (
          <p className="text-red-400 text-sm">
            An error occured. Please try again later.
            {setTimeout(() => {
              setError(null)
            }, 10000)}
            {console.log(error)}</p>
        )}

        {showSignInForm && (
          <SignInForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}

        <span className="mx-auto font-bold">OR</span>

        <GoogleAuthButton />

        {!showSignInForm && (
          <div className="text-center py-2 text-gray-500">
            Do not have an account? <Link className="underline text-black" to={'/signup'}>Sign Up</Link>
          </div>
        )}

      </div>
    </div>
  )
}

export default SignIn