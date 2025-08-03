import express from 'express';

const userRouter = express.Router();
import { createUser } from '../controler/userController.js';
import { loginUser } from '../controler/userController.js';



userRouter.post("/",createUser)
userRouter.post("/login", loginUser);

export default userRouter;