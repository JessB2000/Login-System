import mongoose from "../database/db";
import bcryptjs from "bcryptjs";
import { isConstructorDeclaration } from "typescript";
const UserSchema = new mongoose.Schema({
    nome: {
      type: String, 
      required: true, 
    }, 
    email: {
     type: String, 
     required: true, 
     unique: true, // email único
     lowercase: true, 
    }, 
    senha: {
     type: String, 
     required: true, 
     select: false, 
    },
    createdAt: {
     type: Date, 
     default: Date.now
    }
})

UserSchema.pre("save", async function (next) {
  const hash = await bcryptjs.hash(this.senha, 10);
  console.log(this); 
  console.log(hash); 
  this.senha = hash; 
})
export const UserModel = mongoose.model("User", UserSchema);

 
