import dotenv from "dotenv"; 
dotenv.config(); 
import { Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";

const secret = process.env.SECRET; 

export const autenticacaoMiddleware = (req: Request, res: Response, next) =>{
 const autentheader = req.headers.authorization; 
 if(!autentheader){
    return res.status(401).json({
        error: true, 
        message: "Token não fornecido"
    })
 }
 const partes = autentheader.split(" ");  
 if(partes.length !== 2){   // lenght identifica o tamanho das palavras 
    return res.status(401).json({
        error: true, 
        message: "Token com tipo inválido"
    })
 }
 const [scheme, token] = partes; 
 if(scheme.indexOf("Bearer") !== 0){
    return res.status(401).json({
        error: true,
        message: "Token com formato errado"
    })
 }   //indexOf (função pra saber se há uma determinada palavra na variável)

 return jwt.verify(token, secret, (err, decoded) => {
    if(err){
        return res.status(401).json({
            error: true, 
            message: "Token inválido"
        })
    }
   req.usuarioLogado = decoded; 
   console.log(err); 
   console.log(decoded); 
   return next(); 
 })

}

