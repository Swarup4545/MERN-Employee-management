import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
  const [f_userName, setUsername] = useState('');
  const [f_Pwd, setPassword] = useState('');
  const navigate=useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post('http://localhost:8000/api/login', { f_userName, f_Pwd });
      console.log("login", data);
      const token=localStorage.setItem("token",data.data.token);
      const username=localStorage.setItem("userName",data.data.user.f_userName);
      console.log("user name",localStorage.getItem("token"),localStorage.getItem("userName"));
      navigate("/dashboard");
      if(username){
        
        console.log("dash")
      }
    } catch (err) {
      console.log(err);
      alert('Invalid login');
    }
  };

  return (
    <>
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div>
      <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-96">
        <h2 className="text-center text-2xl font-bold mb-5">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={f_userName}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={f_Pwd}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
      <span className='text-semibold text-2xl mr-auto'>Don't Have an account?<Link to='/signup'><button
            className=" text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Signup
          </button></Link></span>
      </div> 
    </div>
    
    </>
    
  );
};

export default Login;
