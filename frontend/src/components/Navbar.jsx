// Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Assuming you store the username in localStorage after login
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        // Clear session, token, or any auth-related data
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 text-white py-4 px-8 static">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link to="/dashboard" className="hover:text-gray-400">Admin Panel</Link>
                </div>

                <div className="flex items-center space-x-6">
                    <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
                    <Link to="/employees" className="hover:text-gray-400">Employee List</Link>
                    <Link to="/create-employee" className="hover:text-gray-400">Create Employee</Link>

                    <span className="font-semibold">{username}</span>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
