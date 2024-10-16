import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const type = queryParameters.get("val");
    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    const [employee, setEmployee] = useState({
        f_Name: '',
        f_Email: '',
        f_Mobile: '',
        f_Designation: '',
        f_gender: '',
        f_Course: '',
        f_Image: '',
    });

    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            const user = localStorage.getItem('userName');
            try {
                // Fetch employee details by ID
                const response = await axios.get(`http://localhost:8000/api/employeelist/?id=${type}&user=${user}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEmployee(response.data);

            } catch (err) {
                console.log('Error fetching employee:', err);
            }
        };
        fetchEmployee();
    }, [type]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('f_Name', employee.f_Name);
        formData.append('f_Email', employee.f_Email);
        formData.append('f_Mobile', employee.f_Mobile);
        formData.append('f_Designation', employee.f_Designation);
        formData.append('f_gender', employee.f_gender);
        formData.append('f_Course', employee.f_Course);
        if (file) formData.append('f_Image', file);

        try {
            const response = await axios.put(`http://localhost:8000/api/employee_edit/${type}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Employee updated:', response.data);
            navigate('/dashboard/employelist');
        } catch (err) {
            console.log('Error updating employee:', err);
        }
    };

    return (
        <>
            <div className="h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Edit Employee</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="f_Name" className="block text-xl font-medium text-gray-700 dark:text-gray-300">Name:</label>
                            <input
                                type="text"
                                name="f_Name"
                                value={employee.f_Name}
                                onChange={handleInputChange}
                                placeholder="Enter Name"
                                className="w-full px-4 py-2  mt-1 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="f_Email" className="block text-xl font-medium text-gray-700 dark:text-gray-300">Email:</label>
                            <input
                                type="email"
                                name="f_Email"
                                value={employee.f_Email}
                                onChange={handleInputChange}
                                placeholder="Enter Email"
                                className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="f_Mobile" className="block text-xl font-medium text-gray-700 dark:text-gray-300">Mobile:</label>
                            <input
                                type="text"
                                name="f_Mobile"
                                value={employee.f_Mobile}
                                onChange={handleInputChange}
                                placeholder="Enter Mobile"
                                className="w-full px-4 py-2 mt-1 border rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="f_Designation" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Designation:</label>
                            <input
                                type="text"
                                name="f_Designation"
                                value={employee.f_Designation}
                                onChange={handleInputChange}
                                placeholder="Enter Designation"
                                className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="f_gender" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Gender:</label>
                            <input
                                type="text"
                                name="f_gender"
                                value={employee.f_gender}
                                onChange={handleInputChange}
                                placeholder="Enter Gender"
                                className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="f_Course" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Course:</label>
                            <input
                                type="text"
                                name="f_Course"
                                value={employee.f_Course}
                                onChange={handleInputChange}
                                placeholder="Enter Course"
                                className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="f_Image" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Profile Image:</label>
                            <input
                                type="file"
                                name="f_Image"
                                onChange={handleFileChange}
                                className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Update Employee
                        </button>
                    </form>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default EditEmployee;
