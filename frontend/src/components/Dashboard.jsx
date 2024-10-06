import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './navBar';

const Dashboard = () => {
    const navigate = useNavigate();

    // Handle logout
    const handleLogout = () => {
        // Clear session, token, or any auth-related data
        localStorage.removeItem('token');
        navigate('/login');
    };

    const username = localStorage.getItem('username');
    useEffect(() => {
        // Optional: Check if user is authenticated, if not redirect to login
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (<>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Welcome {username}</h1>
        </div>
    </>
    );
};

export default Dashboard;
