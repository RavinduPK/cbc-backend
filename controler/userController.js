import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

 export function createUser(req,res){

    const hashedpassword = bcrypt.hashSync(req.body.password,10)
    const user = new User(
        {
        email :req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,   
        password : hashedpassword,
        }

    )
    user.save().then(
        ()=>{
            res.json({
                message : "User created succesfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Failed to create User"
            })
        }
    )
}

export function loginUser(req,res){
    User.findOne(
        {
            email : req.body.email
        }
    ).then(
        (user)=>{
            if(user == null){
                res.json({
                    message : "User not found"
                })
            }else{
                const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
                if(isPasswordValid){

                    const token = jwt.sign(
                        {
                          email: user.email, 
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role  : user.role,
                            isBlock : user.isBlock,
                            isEmailVerified : user.isEmailVerified
                        },

                        "jwt-secret"
                    )
                    res.status(200).json({
                        message : "Login successful",
                        token : token
                       
                    })
                }else{
                    res.json({
                        message : "Invalid password"
                    })
                }
            }
        }
    )
}

export function isAdmin(req){
    if(req.user ==  null){
        return false;
    }
    if(req.user.role !== 'admin'){
        return false;
    }
    return true;
}