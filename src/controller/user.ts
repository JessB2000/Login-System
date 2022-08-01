import { Router } from "express";
import {createUser, loginUser } from "../service/user"

const UserRouter = Router(); 

UserRouter.route('/register')
    .post(createUser);

UserRouter.route('/login')
     .post(loginUser);
   
UserRouter.route('/delete')
   //  .delete(deleteUser); 
export default UserRouter;