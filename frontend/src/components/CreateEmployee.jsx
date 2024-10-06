import { useState } from 'react';
import axios from 'axios';
import Navbar from './navBar';

const CreateEmployee = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('Male'); // default value
    const [courses, setCourses] = useState([]);
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageKey, setImageKey] = useState(Date.now());

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCoursesChange = (course) => {
        if (courses.includes(course)) {
            setCourses(courses.filter(c => c !== course));
        } else {
            setCourses([...courses, course]);
        }
    };

    const validateEmail = async (email) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/employees`);
            const employees = response.data.employees; // Assuming the API returns an array of employees

            // Check if any employee has the same email as the entered one
            const emailExists = employees.some(employee => employee.email === email);

            return emailExists; // Return true if email exists, false otherwise
        } catch (error) {
            console.error('Error checking email:', error);
            return false; // Return false if there's an error
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Validate Email Format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            setLoading(false);
            return;
        }

        // Validate Duplicate Email
        const emailExists = await validateEmail(email);
        if (emailExists) {
            setError('Email already in use.');
            setLoading(false);
            return;
        }

        // Validate Mobile Number
        const mobileRegex = /^[0-9]+$/; // only digits
        if (!mobileRegex.test(mobileNo)) {
            setError('Mobile number must be numeric.');
            setLoading(false);
            return;
        }

        // Validate Mobile Number Length
        if (mobileNo.length < 10) {
            setError('Please Enter Valid Number');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobileNo', mobileNo);
        formData.append('designation', designation);
        formData.append('gender', gender);
        formData.append('courses', courses.join(',')); // send courses as comma-separated string
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:3000/api/employees', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSuccess('Employee created successfully');
            setName('');
            setEmail('');
            setMobileNo('');
            setDesignation('');
            setGender('Male');
            setCourses([]);
            setFile(null);
            setImageKey(Date.now()); // Add this line to force the reset of the input
        } catch (err) {
            setError('Failed to create employee');
            console.error('Error creating employee:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Create New Employee</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto border border-gray-200">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Mobile No</label>
                        <input
                            type="text"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                            required
                            className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Designation</label>
                        <select
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            required
                            className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        >
                            <option value="">Select Designation</option>
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                        <div className="flex items-center">
                            <label className="mr-6 flex items-center">
                                <input
                                    type="radio"
                                    value="Male"
                                    checked={gender === 'Male'}
                                    onChange={() => setGender('Male')}
                                    className="mr-2"
                                />{' '}
                                Male
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Female"
                                    checked={gender === 'Female'}
                                    onChange={() => setGender('Female')}
                                    className="mr-2"
                                />{' '}
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Courses</label>
                        <div className="flex flex-col space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    value="React"
                                    checked={courses.includes('React')}
                                    onChange={() => handleCoursesChange('React')}
                                    className="mr-2"
                                />{' '}
                                React
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    value="Node"
                                    checked={courses.includes('Node')}
                                    onChange={() => handleCoursesChange('Node')}
                                    className="mr-2"
                                />{' '}
                                Node
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    value="MongoDB"
                                    checked={courses.includes('MongoDB')}
                                    onChange={() => handleCoursesChange('MongoDB')}
                                    className="mr-2"
                                />{' '}
                                MongoDB
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image</label>
                        <input
                            key={imageKey} // This will force the input to remount and clear the file
                            type="file"
                            accept="image/jpeg, image/png"
                            onChange={handleFileChange}
                            required
                            className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Submitting...' : 'Create Employee'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateEmployee;
