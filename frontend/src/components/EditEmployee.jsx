import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
    const { id } = useParams(); // Get the employee ID from the URL
    const navigate = useNavigate(); // For navigation after saving
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
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/employees/${id}`);
                const employee = response.data.employee;

                setName(employee.name);
                setEmail(employee.email);
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
        setFile(e.target.files[0]);
    };

    const handleCoursesChange = (course) => {
        if (courses.includes(course)) {
            setCourses(courses.filter(c => c !== course));
        } else {
            setCourses([...courses, course]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

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
            navigate('/employee-list'); // Redirect after saving
        } catch (err) {
            setError('Failed to update employee');
            console.error('Error updating employee:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Edit Employee</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Mobile No</label>
                    <input
                        type="text"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Designation</label>
                    <select
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
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
                    <div>
                        <label className="mr-4">
                            <input
                                type="checkbox"
                                value="React"
                                checked={courses.includes('React')}
                                onChange={() => handleCoursesChange('React')}
                            />{' '}
                            React
                        </label>
                        <label className="mr-4">
                            <input
                                type="checkbox"
                                value="Node"
                                checked={courses.includes('Node')}
                                onChange={() => handleCoursesChange('Node')}
                            />{' '}
                            Node
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="MongoDB"
                                checked={courses.includes('MongoDB')}
                                onChange={() => handleCoursesChange('MongoDB')}
                            />{' '}
                            MongoDB
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image</label>
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleFileChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
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
                        {loading ? 'Submitting...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEmployee;
