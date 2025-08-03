import Student from "../models/student.js";

 export function getStudent(req,res){
        console.log(req)
        console.log("Get request received");




        //me part eken wenne namak enter karama eke issrata Ms kiyla wadinna 
        // let prefix = "Mr."
        // if(req.body.gender == "female"){
        //     prefix = "Ms."
        // }

        // res.json({
        //     message : "Hello "+" "+ prefix +req.body.name
        // }
   // )



     // read and get all the sthudents information from the mongodb database

       Student.find().then(
        (student)=>{
            res.json(
                student
            )
        }
       ).catch()
    }






      export function createStudent(req,res){

        if(req.user == null){
          res.json({
            message :"Please login and try again ."      
              })
              return
        }
        
        if(req.user.role != "admin"){
          res.json({
            message :"You are not authorized to create a student"      
              })
              return
        }
     // console.log("Post request received");  

      const student = new Student (
        {
            name : req.body.name,
            age : req.body.age,
            city : req.body.city 
        }
      )

      student.save().then(
        ()=>{
            res.json(
                {
                    message : "Student Created successfully"
                }
            )
        }
      ).catch(
        ()=>{
            res.json(
                {
                  message : " Failed to create Student" 
                }
            )
        }
      )
    }