import {Request, Response} from 'express'; 
import {UserModel} from '../models/user';
import bcrypt from "bcrypt"; 

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
     message: "Usuário registrado com sucesso",
     data: User
    }); 
} catch(error){
    res.status(500).json({message:error}); 
}
}
export async function loginUser(req:Request, res: Response){
    const {email, senha} = req.body; 
    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
      }
    if (!senha){
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }
    const User = await UserModel.findOne({ email: email });

    if(!User){
        return res.status(404).json({ msg: "Usuário não encontrado!" });
    }
    const checkPassword = await bcrypt.compare(senha, User.senha);
    if (!checkPassword) {
        return res.status(422).json({ msg: "Senha inválida" });
     }
}



