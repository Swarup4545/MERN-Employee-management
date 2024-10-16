import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  let token=localStorage.getItem("token");
  useEffect(() => {
    const fetchEmployees = async () => {
      const userId = localStorage.getItem('userName');
      try {
        const response = await axios.get(`http://localhost:8000/api/employeelist/?user=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (err) {
        console.log('Error fetching employee list:', err);
      }
    };

    fetchEmployees();
  }, []);


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/employee_delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(employees.filter(employee => employee._id !== id));
      console.log("response", response);

    } catch (err) {
      console.log('Error deleting employee:', err);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.f_Email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='h-screen flex justify-center'>
      <div className='w-[90%]'>
      <h2 className='text-2xl font-bold mt-5 mb-5'>Employee List</h2>
      <input className='border p-2 w-[40%] border-black outline-none h-11 rounded'
        type="text"
        placeholder="Enter Search Keyword"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        
      />
      <table className='mt-10' border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td>
              <td>
                {employee.f_Image ? (
                  <img src={`http://localhost:8000/images/${employee.f_Image}`} alt="Employee" width="50" height="50" />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{employee.f_Name}</td>
              <td>{employee.f_Email}</td>
              <td>{employee.f_Mobile}</td>
              <td>{employee.f_Designation}</td>
              <td>{employee.f_gender}</td>
              <td>{employee.f_Course}</td>
              <td>{new Date(employee.f_Createdate).toLocaleDateString()}</td>
              <td>
                <Link to={`/dashboard/edit_employee/?val=${employee._id}`} ><button style={{ marginRight: '10px' }}>Edit</button></Link>

                <button onClick={() => handleDelete(employee._id)} style={{ color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default EmployeeList;
