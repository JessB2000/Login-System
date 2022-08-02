import dotenv from "dotenv"; 
dotenv.config(); 
import express, { request, response } from "express";
import {Request, Response} from 'express'; 
import {UserModel} from '../models/user';
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 
import {autenticacaoMiddleware} from '../middlewares/autenticacao';

const secret = process.env.SECRET; 
// gerar token

const gerarToken = (user = {}) => {
    return jwt.sign({
        id: user.id,
        nome: user.nome
     },secret,{
        expiresIn:86400
     })
}


// register
export async function createUser(req:Request, res: Response){
    const {email} = req.body; 
    if (await UserModel.findOne({email})){
        return res.status(400).json({
            error: true, 
            message: "Usuário já existe"
        })
    }
    const user = await UserModel.create(req.body); // criando novo registro do banco de dados
   if(!user.nome){
        return res.status(422).json({ msg: "O nome é obrigatório!" });
    }
    if (!user.email){
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }
    if(!user.senha){
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    return res.json({
     error: false, 
     msg: "Usuário registrado com sucesso",
     data: user,
     token: gerarToken(user)
    }); 
}

//Login 

export async function loginUser(req:Request, res: Response){
 const {email, senha} = req.body; 
 if(!email){
    return res.status(422).json({ message: "O email é obrigatório!" });
 }
 if(!senha){
    return res.status(422).json({ message: "A senha é obrigatória!" });
 }
 const user = await UserModel.findOne({email});

 if(!user){
    return res.status(400).json({
        error: true, 
        message: "Usuário inválido"
    })
 } 
 if(!await bcrypt.compare(senha, user.senha)){
    return res.status(400).send({
        error: true,
        message: "Senha inválida"
    })
 }

 return res.json({
    user,
    token: gerarToken(user)
 })
}

export async function deleteUser(req:Request, res: Response){
    const nome = req.body;
   await UserModel.findOneAndDelete(nome);
      if (!nome) return res.status(500).json({ msg: "nome não encontrado"});
      return res.json({
        error: false, 
        message: "Usuário excluído com sucesso"
      });
  };
  
export async function updateUser(req:Request, res:Response){
    console.log(req.body.nome);
 await UserModel.findOneAndUpdate({ nome: req.body.nome },{ $set: { senha: req.body.senha}}) 
 try{

    return res.json({
        error:false,
        message: "Senha atualizada com sucesso"
    })

 }catch(error){
    console.log(error); 
 }
}
