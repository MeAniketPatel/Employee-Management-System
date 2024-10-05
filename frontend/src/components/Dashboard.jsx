import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
    const navigate = useNavigate();

    // Handle logout
    const handleLogout = () => {
        // Clear session, token, or any auth-related data
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        // Optional: Check if user is authenticated, if not redirect to login
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Welcome to Admin Panel</h1>

            <div className="flex flex-col gap-4 w-full max-w-md">
                <button
                    onClick={() => navigate('/employees')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    View Employee List
                </button>
                <button
                    onClick={() => navigate('/create-employee')}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Create Employee
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
