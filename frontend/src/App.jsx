import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee';

// Private Route component for authenticated routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log(token);

  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
        <Route
          path="/employees"
          element={<PrivateRoute><EmployeeList /></PrivateRoute>}
        />
        <Route
          path="/create-employee"
          element={<PrivateRoute><CreateEmployee /></PrivateRoute>}
        />
        {/* Other routes */}
        <Route path="/edit-employee/:id"
          element={<PrivateRoute><EditEmployee /></PrivateRoute>} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
