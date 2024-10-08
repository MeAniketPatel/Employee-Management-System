import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './navBar';

const EditEmployee = () => {
    const { id } = useParams(); // Get the employee ID from the URL
    const navigate = useNavigate(); // For navigation after saving
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [originalEmail, setOriginalEmail] = useState(''); // Store original email separately
    const [mobileNo, setMobileNo] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('Male'); // default value
    const [courses, setCourses] = useState([]);
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/employees/${id}`);
                const employee = response.data.employee;

                setName(employee.name);
                setEmail(employee.email);
                setOriginalEmail(employee.email); // Set original email
                setMobileNo(employee.mobileNo);
                setDesignation(employee.designation);
                setGender(employee.gender);
                setCourses(employee.courses); // Assuming courses are already an array
            } catch (err) {
                setError('Failed to load employee details');
                console.error('Error fetching employee:', err);
            } finally {
                setLoadingData(false);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png')) {
            setFile(selectedFile);
        } else {
            setError('Only JPG and PNG files are allowed.');
            setFile(null);
        }
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
            const employees = response.data.employees;

            // Exclude current employee from email uniqueness check
            const emailExists = employees.some(employee => employee.email === email && employee._id !== id);

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

        // Check if the email has been changed
        if (email !== originalEmail) {
            // Validate Duplicate Email
            const emailExists = await validateEmail(email);
            if (emailExists) {
                setError('Email already in use.');
                setLoading(false);
                return;
            }
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
        if (file) {
            formData.append('image', file); // Include image only if a new file is selected
        }

        try {
            const response = await axios.put(`http://localhost:3000/api/employees/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSuccess('Employee updated successfully');
            // Redirect after a short delay
            setTimeout(() => {
                navigate('/employees'); // Redirect after saving
            }, 1000);
        } catch (err) {
            setError('Failed to update employee');
            console.error('Error updating employee:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Employee</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto">

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Mobile No</label>
                        <input
                            type="text"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Designation</label>
                        <select
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Designation</option>
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                        <div>
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    value="Male"
                                    checked={gender === 'Male'}
                                    onChange={() => setGender('Male')}
                                />{' '}
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="Female"
                                    checked={gender === 'Female'}
                                    onChange={() => setGender('Female')}
                                />{' '}
                                Female
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Courses</label>
                        <div className="flex flex-wrap">
                            {['React', 'Node', 'MongoDB'].map((course) => (
                                <label key={course} className="mr-4">
                                    <input
                                        type="checkbox"
                                        value={course}
                                        checked={courses.includes(course)}
                                        onChange={() => handleCoursesChange(course)}
                                    />{' '}
                                    {course}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image</label>
                        <input
                            type="file"
                            accept="image/jpeg, image/png"
                            onChange={handleFileChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
};

export default EditEmployee;