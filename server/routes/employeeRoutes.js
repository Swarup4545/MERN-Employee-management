const express=require("express");
const multer=require("multer");
const {CreateEmployee,EmplyeeList,updateEmployee,deleteEmployee}=require("../controllers/employeeController");
const auth = require('../middleware/authMiddleware');
const routes=express.Router();
const path=require('path');


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images");
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"_" + Date.now() + path.extname(file.originalname))
    }
})
const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only JPG and PNG is allowed!'), false);
    }
  };
const upload=multer({
    storage,
    fileFilter
})

routes.post("/create_employee",upload.single("f_Image"),auth,CreateEmployee);
routes.get("/employeelist",auth,EmplyeeList);
routes.put("/employee_edit/:id",upload.single('f_Image'),auth,updateEmployee);
routes.delete("/employee_delete/:id",auth,deleteEmployee);

module.exports=routes;