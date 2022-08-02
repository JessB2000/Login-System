import { Router } from "express";
import { autenticacaoMiddleware } from "../middlewares/autenticacao";
import {createUser, deleteUser, loginUser, updateUser } from "../service/user"


const UserRouter = Router(); 

UserRouter.route('/register')
    .post(createUser);

UserRouter.route('/login')
     .post(loginUser);
   
UserRouter.route('/delete/:nome')
      .delete(autenticacaoMiddleware, deleteUser); 

UserRouter.route('/update/:nome')
      .patch(autenticacaoMiddleware, updateUser); 
export default UserRouter;