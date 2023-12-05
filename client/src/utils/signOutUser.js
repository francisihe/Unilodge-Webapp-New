
export const signOutUser = async () => {
    try {
        // Call Signout endpoint from backend to clear token
        const res = await fetch('/api/v1/auth/signout')
        const data = await res.json();
        console.log('data', data);

        // Remove token from localStorage
        localStorage.removeItem('token');
        console.log('Token removed');

        // Refresh page to clear state and navigate to home
        window.location.reload();
        window.location.href = '/';

        return;

    } catch (error) {
        return error;
    }
}