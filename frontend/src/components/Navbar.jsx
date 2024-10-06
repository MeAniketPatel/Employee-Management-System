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
        <nav className="bg-gray-200 text-gray-950 py-4 px-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center flex-wrap">
                <div className="text-xl font-bold">
                    <Link to="/dashboard" className="hover:text-gray-400 transition duration-300">Admin Panel</Link>
                </div>

                {/* Responsive Hamburger Icon */}
                <div className="md:hidden">
                    <button
                        className="text-gray-800 focus:outline-none"
                        onClick={() => {
                            const menu = document.getElementById('mobile-menu');
                            menu.classList.toggle('hidden');
                        }}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex md:items-center md:space-x-8">
                    <Link to="/dashboard" className="relative inline-block text-gray-800 group">
                        <span className="relative transition-all duration-300 group-hover:text-blue-600">Dashboard</span>
                        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-500 transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
                    </Link>
                    <Link to="/employees" className="relative inline-block text-gray-800 group">
                        <span className="relative transition-all duration-300 group-hover:text-blue-600">Employee List</span>
                        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-500 transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
                    </Link>
                    <Link to="/create-employee" className="relative inline-block text-gray-800 group">
                        <span className="relative transition-all duration-300 group-hover:text-blue-600">Create New Employee</span>
                        <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-500 transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
                    </Link>

                    <span className="font-semibold">{username}</span>

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-3xl transition duration-300"
                    >
                        Logout
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden hidden flex-col absolute top-16 left-0 w-full bg-gray-200 shadow-md z-10" id="mobile-menu">
                    <Link to="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Dashboard</Link>
                    <Link to="/employees" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Employee List</Link>
                    <Link to="/create-employee" className="block px-4 py-2 text-gray-800 hover:bg-gray-300">Create New Employee</Link>
                    <span className="block px-4 py-2 font-semibold">{username}</span>
                    <button
                        onClick={handleLogout}
                        className="block w-full bg-red-600 hover:bg-red-800 text-white font-bold py-2 rounded-3xl transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
