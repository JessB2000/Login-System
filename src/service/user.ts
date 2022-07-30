import {Request, Response} from 'express'; 
import {UserModel} from '../models/user';

export async function createUser(req:Request, res: Response){
    const {email} = req.body; 
    if (await UserModel.findOne({email})){
        return res.status(400).json({
            error: true, 
            message: "Usuário já existe"
        })
    }
    const User = await UserModel.create(req.body); // criando novo registro do banco de dados

   // User.senha = undefined; // para não aparecer a senha no postman, fica dando isso

    return res.json({
     error: false, 
     message: "Usuário registrado com sucesso",
     data: User
    }); 
}

export const deleteUser = (req:Request, res: Response) => {
    console.log(req.body); 
    return res.json({
     error:false, 
     message: "Usuário deletado com sucesso"
    })
}
