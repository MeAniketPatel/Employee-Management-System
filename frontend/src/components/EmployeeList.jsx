import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate'; // Import ReactPaginate
import Navbar from './navBar';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [sortField, setSortField] = useState('name'); // Sort by name initially
    const [sortOrder, setSortOrder] = useState('asc');  // Ascending order initially

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/employees');
                setEmployees(Array.isArray(response.data.employees) ? response.data.employees : []);
            } catch (err) {
                setError('Failed to load employees');
                console.error('Error fetching employees:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/api/employees/${id}`);
                setEmployees(employees.filter(employee => employee._id !== id));
            } catch (err) {
                console.error('Error deleting employee:', err);
                setError('Failed to delete employee');
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-employee/${id}`);
    };

    // Filter employees based on search term
    const filteredEmployees = employees.filter(employee => {
        return (
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.mobileNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee._id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Function to handle sorting
    const handleSort = (field) => {
        // Toggle sorting order if the same field is clicked, otherwise set to 'asc'
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    // Sort employees based on the selected field and order
    const sortedEmployees = filteredEmployees.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    const employeesPerPage = 10;

    // Paginate the sorted employees
    const displayedEmployees = sortedEmployees.slice(
        currentPage * employeesPerPage,
        (currentPage + 1) * employeesPerPage
    );

    // Handle page change
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (<>
        <Navbar />
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Employee List</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name/email/mobileNo/ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded px-4 py-2 mb-4 w-full"
            />

            <div className='flex flex-row-reverse mx-8 py-2'>Total Count: {sortedEmployees.length}</div>

            {sortedEmployees.length === 0 ? (
                <div className="text-center">No employees found</div>
            ) : (
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('_id')}>
                                ID {sortField === '_id' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>
                                Name {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('email')}>
                                Email {sortField === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('mobileNo')}>
                                Mobile {sortField === 'mobileNo' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('designation')}>
                                Designation {sortField === 'designation' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th className="px-4 py-2">Gender</th>
                            <th className="px-4 py-2">Courses</th>
                            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('createdAt')}>
                                Created At {sortField === 'createdAt' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedEmployees.map((employee) => (
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
                                <td className="px-4 py-2">
                                    {new Date(employee.createdAt).toLocaleDateString('en-IN', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </td>
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
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={Math.ceil(sortedEmployees.length / employeesPerPage)}
                onPageChange={handlePageChange}
                containerClassName={'flex justify-center items-center space-x-2 mt-4'}
                previousLinkClassName={'px-3 py-1 bg-gray-300 rounded hover:bg-gray-400'}
                nextLinkClassName={'px-3 py-1 bg-gray-300 rounded hover:bg-gray-400'}
                disabledClassName={'cursor-not-allowed opacity-50'}
                pageClassName={'px-3 py-1 border border-gray-300 rounded'}
                activeClassName={'bg-blue-500 text-white'}
                marginPagesDisplayed={0}
                pageRangeDisplayed={5}
            />
        </div>
    </>
    );
};

export default EmployeeList;
