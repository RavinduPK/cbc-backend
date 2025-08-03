import express from 'express';

import { createStudent, getStudent } from '../controler/studentController.js';

const  studentRounter = express.Router();

studentRounter.get("/",getStudent);

studentRounter.post("/", createStudent);




export default studentRounter;


