import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For navigation to edit employee page

    useEffect(() => {
        // Fetch employee data on component mount
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/employees');
                setEmployees(Array.isArray(response.data.employees) ? response.data.employees : []);
                console.log(response);
            } catch (err) {
                setError('Failed to load employees');
                console.error('Error fetching employees:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    // Delete Employee function
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/employees/${id}`);
                setEmployees(employees.filter(employee => employee._id !== id)); // Remove employee from state
            } catch (err) {
                console.error('Error deleting employee:', err);
                setError('Failed to delete employee');
            }
        }
    };

    // Navigate to the edit page
    const handleEdit = (id) => {
        navigate(`/edit-employee/${id}`); // You will need an edit employee route to handle this
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Employee List</h1>

            {employees.length === 0 ? (
                <div className="text-center">No employees found</div>
            ) : (
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Mobile</th>
                            <th className="px-4 py-2">Designation</th>
                            <th className="px-4 py-2">Gender</th>
                            <th className="px-4 py-2">Courses</th>
                            <th className="px-4 py-2">Created At</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee._id} className="bg-white border-b">
                                <td className="px-4 py-2">{employee._id}</td>
                                <td className="px-4 py-2">
                                    <img src={employee.image} alt={employee.name} className="h-10 w-10 rounded-full" />
                                </td>
                                <td className="px-4 py-2">{employee.name}</td>
                                <td className="px-4 py-2">{employee.email}</td>
                                <td className="px-4 py-2">{employee.mobileNo}</td>
                                <td className="px-4 py-2">{employee.designation}</td>
                                <td className="px-4 py-2">{employee.gender}</td>
                                <td className="px-4 py-2">{employee.courses.join(', ')}</td>
                                <td className="px-4 py-2">{new Date(employee.createData).toLocaleDateString()}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleEdit(employee._id)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(employee._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EmployeeList;
