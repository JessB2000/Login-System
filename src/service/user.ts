import dotenv from "dotenv"; 
dotenv.config(); 
import {Request, Response} from 'express'; 
import {UserModel} from '../models/user';
import bcryptjs from "bcryptjs";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 

const secret = process.env.SECRET; 

// register
export async function createUser(req:Request, res: Response){
    const {email} = req.body; 
    if (await UserModel.findOne({email})){
        return res.status(400).json({
            error: true, 
            message: "Usuário já existe"
        })
    }
    const User = await UserModel.create(req.body); // criando novo registro do banco de dados
    if(!User.nome){
        return res.status(422).json({ msg: "O nome é obrigatório!" });
    }
    if (!User.email){
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }
    if(!User.senha){
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }
    try {
    await User.save(); 
    return res.json({
     error: false, 
     msg: "Usuário registrado com sucesso",
     data: User
    }); 
} catch(error){
    res.status(500).json({message:error}); 
}
}

//Login 

export async function loginUser(req:Request, res: Response){

    const {email, senha} = req.body; 

    /*if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
      }
   /* if (!senha){
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }*/
    const user = await UserModel.findOne({email}).select("+senha"); 

    if(!user){
        return res.status(404).json({ 
            error: true, 
            msg: "Usuário não encontrado!" });
    }
   const checarSenha =  await bcrypt.compare(senha, user.senha);
   
    if(!checarSenha){
        return res.status(404).send({
            error: true,
            msg: "Senha inválida"
           
        }) 
    }
    return res.json(user); 

    //autenticação 

    /*try{
      const token = jwt.sign({
        id:user._id,
      }, secret, {
        expiresIn:86400
      } ); 
      return res.json({
        user,
        token,
        msg: "Autenticação realizada com sucesso!"
      })
    }
    catch(error){
        res.status(500).json({ msg: error });
    }*/
}



