import logo from './logo.svg';
import './App.css';
import Signup from './component/auth/Signup';
import Login from './component/auth/Login';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Dashboard from './component/dashboard/Dashboard';
import CreateEmployee from './component/employee/CreateEmployee';
import EmployeeList from './component/dashboard/EmployeeList';
import EditEmployee from './component/dashboard/EditEmployee';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}>
        <Route index element={<CreateEmployee/>}></Route>
        <Route path="employelist" element={<EmployeeList/>}></Route>
        <Route path="edit_employee" element={<EditEmployee/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
