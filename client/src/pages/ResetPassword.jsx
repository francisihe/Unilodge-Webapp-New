import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const ResetPassword = () => {
    window.scrollTo(0, 0); //Scroll to top of page on page load

    // Use email from Forgot Password Page
    const location = useLocation();
    const { email } = location.state || {};

    const [formData, setFormData] = useState({
        email: email || '',
        verificationCode: '',
        newPassword: '',
        passwordConfirm: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // update formData.email when email from state in password reset page changes
    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            email: email || '',
        }));
    }, [email]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.newPassword !== formData['passwordConfirm']) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            
            const res = await fetch('/api/v1/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data);
                setLoading(false);
            }

            if (res.ok) {
                setLoading(false);
                alert('Password Reset Successful')
                navigate('/signin');
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64 text-center">
                <h1 className="text-4xl text-center mb-4">Reset Password</h1>
                <p className="text-gray-600">Check your email for your verification code and choose a new password</p>

                {error && (
                    <p className="text-red-400 text-sm pb-3">
                        {error}
                        {setTimeout(() => {
                            setError(null)
                        }, 10000)}
                        {console.log(error)}</p>
                )}

                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>

                    <input
                        type="email"
                        id="email"
                        placeholder="your@email.com"
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />

                    <input
                        type="number"
                        id="verificationCode"
                        placeholder="Verification Code"
                        onChange={handleChange}
                        value={formData.verificationCode}
                        required
                    />

                    <input
                        type="password"
                        id="newPassword"
                        placeholder="Password"
                        onChange={handleChange}
                        value={formData.password}
                        required
                    />

                    <input
                        type="password"
                        id="passwordConfirm"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        value={formData.passwordConfirm}
                        required
                    />

                    <button
                        disabled={loading}
                        className="bg-orange-600 border-2 border-black p-2 w-full text-white rounded-2xl">
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>

                    <button
                        type='button'
                        onClick={() => navigate('/signin')}
                        className="w-full border-2 border-black my-1 py-2 px-3 rounded-2xl"
                    >
                        Cancel
                    </button>
                </form>


            </div>
        </div>
    )
}

export default ResetPassword