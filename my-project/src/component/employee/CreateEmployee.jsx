import React, { useState } from 'react';
import axios from 'axios';

const CreateEmployee = () => {
  const [info, setInfo] = useState({
    f_user: "",
    f_Name: "",
    f_Email: "",
    f_gender: "",
    f_Mobile: "",
    f_Course: "",
    f_Designmation: ""
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  let token = localStorage.getItem("token");

  const fillData = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!info.f_Email || !emailRegex.test(info.f_Email)) {
      formErrors.f_Email = "Please enter a valid email address.";
      isValid = false;
    }

    
    const mobileRegex = /^\d{10,15}$/;
    if (!info.f_Mobile || !mobileRegex.test(info.f_Mobile)) {
      formErrors.f_Mobile = "Please enter a valid mobile number (10-15 digits).";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const user = localStorage.getItem("userName");
    const formData = new FormData();
    formData.append("f_user", user);
    formData.append("f_Name", info.f_Name);
    formData.append("f_Email", info.f_Email);
    formData.append("f_Mobile", info.f_Mobile);
    formData.append("f_gender", info.f_gender);
    formData.append("f_Course", info.f_Course);
    formData.append("f_Designation", info.f_Designmation);

    if (file) {
      formData.append('f_Image', file);
    }

    try {
      const data = await axios.post(`http://localhost:8000/api/create_employee`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Employee created", data);
    } catch (err) {
      console.log("Error", err);
      alert('Failed to create employee');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-800">
      <div className="w-[90%] bg-white dark:bg-gray-900 py-5 px-10 shadow-lg rounded-lg">
        <form onSubmit={handleSignup}>
          <div className="mb-5">
            <label htmlFor="f_Name" className="text-gray-700 dark:text-gray-200">Name:</label><br />
            <input
              type="text"
              name="f_Name"
              value={info.f_Name}
              onChange={fillData}
              placeholder="Enter Name"
              className="w-[80%] h-11 rounded-md border border-black mt-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="f_Email" className="text-gray-700 dark:text-gray-200">Email:</label><br />
            <input
              type="email"
              name="f_Email"
              value={info.f_Email}
              onChange={fillData}
              placeholder="Enter Email"
              className="w-[80%] h-11 rounded-md border border-black mt-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.f_Email && <p className="text-red-500">{errors.f_Email}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="profileImage" className="text-gray-700 dark:text-gray-200">Upload Profile Image:</label><br />
            <input
              type="file"
              name="profileImage"
              onChange={handleFileChange}
              className="w-[80%] h-11 rounded-md border border-black mt-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="f_gender" className="text-gray-700 dark:text-gray-200">Gender:</label><br />
            <input
              type="text"
              name="f_gender"
              value={info.f_gender}
              onChange={fillData}
              placeholder="Enter Gender"
              className="w-[80%] h-11 rounded-md border border-black mt-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="f_Mobile" className="text-gray-700 dark:text-gray-200">Mobile:</label><br />
            <input
              type="text"
              name="f_Mobile"
              value={info.f_Mobile}
              onChange={fillData}
              placeholder="Enter Mobile"
              className="w-[80%] h-11 rounded-md border border-black mt-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.f_Mobile && <p className="text-red-500">{errors.f_Mobile}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="f_Course" className="text-gray-700 dark:text-gray-200">Course:</label><br />
            <input
              type="text"
              name="f_Course"
              value={info.f_Course}
              onChange={fillData}
              placeholder="Enter Course"
              className="w-[80%] h-11 rounded-md border border-black mt-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="f_Designmation" className="text-gray-700 dark:text-gray-200">Designation:</label><br />
            <input
              type="text"
              name="f_Designmation"
              value={info.f_Designmation}
              onChange={fillData}
              placeholder="Enter Designation"
              className="w-[80%] h-11 rounded-md border border-black mt-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Create Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
