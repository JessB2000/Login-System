import { Router } from "express";
import {createUser, deleteUser, } from "../service/user"

const UserRouter = Router(); 

UserRouter.route('/register')
   // .get(getUsers)
    .post(createUser);

UserRouter.route('/:id')
   // .get(getUser)
    .delete(deleteUser)
   // .put(updateUser);

export default UserRouter;