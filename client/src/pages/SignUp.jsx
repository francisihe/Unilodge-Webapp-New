import { Link, useNavigate } from "react-router-dom";
import GoogleAuthButton from "../components/GoogleAuthButton";
import { useState } from "react";
import SignUpForm from "../components/forms/SignUpForm";
import { FiMail } from "react-icons/fi";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const revealSignUpForm = () => {
    setShowSignUpForm(!showSignUpForm);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
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
      navigate('/');

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Create account</h1>

        <GoogleAuthButton />

        <button
          onClick={revealSignUpForm}
          className='w-full border-2 border-black my-1 py-2 px-3 rounded-2xl 
        hover:bg-blue-500 hover:text-white hover:scale-95 transition-transform'
        >
          <div className='flex items-center justify-center gap-3'>
            <span className='text-xl'><FiMail /></span>
            <span>Continue with Email</span>
          </div>
        </button>

        {!showSignUpForm && (
          <div className="text-center py-2 text-gray-500">
            Already have an account? <Link className="underline text-black" to={'/signin'}>Sign In</Link>
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm">
            An error occured. Please try again later.
            {setTimeout(() => {
              setError(null)
            }, 10000)}
            {console.log(error)}</p>
        )}

        {showSignUpForm && (
          <SignUpForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}

      </div>
    </div>
  )
}

export default SignUp