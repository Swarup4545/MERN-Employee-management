const Employee= require("../models/Employee");


exports.CreateEmployee=async(req,res)=>{
    const {f_Name,f_Email,f_Designation,f_gender,f_Mobile,f_Course,f_Createdate,f_user}=req.body;
    try{
        const user= new Employee({
            f_user,
            f_Name,
            f_Email,
            f_gender,
            f_Course,
            f_Mobile,
            f_Createdate,
            f_Designation,
            f_Image:req.file ? req.file.filename : ""
        })
        await user.save();
        console.log("employee come",user);
        res.status(201).json(user);

    }
    catch(err){
        console.log("erro ala",err)
        res.status(500).json({message:err.message});
    }
}


exports.EmplyeeList=async(req,res)=>{

    const userId = req.query.user;
    console.log("user in fetcg",userId) 
    try {
        
        const employees = await Employee.find({ f_user: userId });
        console.log("Employee list:", employees);
        res.json(employees);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ message: "Server error" });
    }
    
}

exports.updateEmployee = async (req, res) => {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
    
    try {
        const d="670add7ba8c7ce4694a20e6a"
      const employee = await Employee.findById(req.params.id);
      console.log("emp ala",employee)
      
      console.log("name",f_Name);
      employee.f_Name = f_Name ;
      employee.f_Email = f_Email ;
      employee.f_Mobile = f_Mobile ;
      employee.f_Designation = f_Designation ;
      employee.f_gender = f_gender;
      employee.f_Course = f_Course ;
      employee.f_Image = req.file ? req.file.filename : employee.f_Image; 
  
      const emp=await employee.save();
      console.log("edited Emp",req.params.id);
      res.json(employee);
    } catch (err) {
      res.status(500).json({ message: 'Server errooooor' });
    }
  };

exports.deleteEmployee = async (req, res) => {
    try {
  
      const employee = await Employee.findByIdAndDelete(req.params.id);
      console.log("find emp",employee);
 
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      console.log("Deleted employee:", employee);
  
      res.json({ message: 'Employee removed successfully' });
      
    } catch (err) {
      console.error("Error while deleting employee:", err);

      res.status(500).json({ message: 'Server error while deleting employee' });
    }
  };
  