import { useState } from 'react';
import axios from 'axios';

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
    // Define a new state for managing the key of the file input
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
            // To reset the file input, we can force a re-render by creating a new state
            setImageKey(Date.now()); // Add this line to force the reset of the input
        } catch (err) {
            setError('Failed to create employee');
            console.error('Error creating employee:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Create New Employee</h1>
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
                    <label className="block text-gray-700 text-sm font-bold mb-2">MobileNo</label>
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
                        key={imageKey} // This will force the input to remount and clear the file
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleFileChange}
                        required
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
                        {loading ? 'Submitting...' : 'Create Employee'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEmployee;
