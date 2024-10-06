import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Navbar from './navBar';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

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

    const filteredEmployees = employees.filter(employee => {
        const employeeDate = new Date(employee.createdAt).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        return (
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.mobileNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employeeDate.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handleSort = (field) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const sortedEmployees = filteredEmployees.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    if (loading) {
        return <div className="text-center text-blue-600">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    const employeesPerPage = 5;

    const displayedEmployees = sortedEmployees.slice(
        currentPage * employeesPerPage,
        (currentPage + 1) * employeesPerPage
    );

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-10 mt-10 overflow-hidden">
                <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Employee List</h1>

                <input
                    type="text"
                    placeholder="Search by name/email/mobileNo/Unique ID/Created Date"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded-lg px-4 py-3 mb-6 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <div className='flex flex-row-reverse mx-8 py-2 text-gray-600'>Total Count: {sortedEmployees.length}</div>

                {sortedEmployees.length === 0 ? (
                    <div className="text-center text-gray-600">No employees found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full min-w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 cursor-pointer text-gray-700" onClick={() => handleSort('_id')}>
                                        Unique ID {sortField === '_id' && (sortOrder === 'asc' ? '▲' : '▼')}
                                    </th>
                                    <th className="px-4 py-2">Image</th>
                                    <th className="px-4 py-2 cursor-pointer text-gray-700" onClick={() => handleSort('name')}>
                                        Name {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                                    </th>
                                    <th className="px-4 py-2 cursor-pointer text-gray-700" onClick={() => handleSort('email')}>
                                        Email {sortField === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                                    </th>
                                    <th className="px-4 py-2 cursor-pointer text-gray-700" onClick={() => handleSort('mobileNo')}>
                                        Mobile {sortField === 'mobileNo' && (sortOrder === 'asc' ? '▲' : '▼')}
                                    </th>
                                    <th className="px-4 py-2 cursor-pointer text-gray-700" onClick={() => handleSort('designation')}>
                                        Designation {sortField === 'designation' && (sortOrder === 'asc' ? '▲' : '▼')}
                                    </th>
                                    <th className="px-4 py-2">Gender</th>
                                    <th className="px-4 py-2">Courses</th>
                                    <th className="px-4 py-2 cursor-pointer text-gray-700" onClick={() => handleSort('createdAt')}>
                                        Created At {sortField === 'createdAt' && (sortOrder === 'asc' ? '▲' : '▼')}
                                    </th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedEmployees.map((employee) => (
                                    <tr key={employee._id} className="bg-white border-b hover:bg-gray-100 transition duration-200">
                                        <td className="px-4 py-2">{employee._id}</td>
                                        <td className="px-4 py-2">
                                            <img src={employee.image} alt={employee.name} className="h-10 w-10 rounded-full border-2 border-blue-500" />
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
                                                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600 transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(employee._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <ReactPaginate
                    previousLabel={'◀'}
                    nextLabel={'▶'}
                    pageCount={Math.ceil(sortedEmployees.length / employeesPerPage)}
                    onPageChange={handlePageChange}
                    containerClassName={'flex justify-center items-center space-x-2 mt-4'}
                    previousLinkClassName={'px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition'}
                    nextLinkClassName={'px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition'}
                    disabledClassName={'cursor-not-allowed opacity-50'}
                    pageClassName={'px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 transition'}
                    activeClassName={'bg-blue-500 text-white'}
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={5}
                />
            </div>
        </>
    );
};

export default EmployeeList;
