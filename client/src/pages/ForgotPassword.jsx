import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    window.scrollTo(0, 0); //Scroll to top of page on page load

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
            const res = await fetch('/api/v1/auth/forgot-password', {
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
                alert('Check your email for a reset password link')
                navigate('/reset-password', { state: { email: formData.email } });
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64 text-center">
                <h1 className="text-4xl text-center mb-4">Forgot Password?</h1>
                <p className="text-gray-600">Enter your email address below <br />
                    We&#39;ll send you password reset instructions if your account exists.</p>

                {error && (
                    <p className="text-red-400 text-sm pb-3">
                        {error}
                        {setTimeout(() => {
                            setError(null)
                        }, 10000)}
                        {console.log(error)}</p>
                )}

                <form className="max-w-md mx-auto mb-6 py-3" onSubmit={handleSubmit}>

                    <input
                        type="email"
                        id="email"
                        placeholder="your@email.com"
                        onChange={handleChange}
                        className="text-center"
                        required
                    />

                    <button
                        disabled={loading}
                        className="bg-orange-600 border-2 border-black p-2 w-full text-white rounded-2xl">
                        {loading ? 'Resetting...' : 'Send Password Reset Email'}
                    </button>
                </form>

            </div>
        </div>
    )
}

export default ForgotPassword