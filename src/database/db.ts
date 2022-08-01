import dotenv from "dotenv";
dotenv.config(); 
import mongoose from "mongoose";

const dbUser = process.env.DATABASE_USER;
const dbSenha = process.env.DATABASE_PASSWORD; 
mongoose.connect(`mongodb+srv://${dbUser}:${dbSenha}@cluster0.npqgg.mongodb.net/?retryWrites=true&w=majority`, {}, (error) => {
if (error){
    console.log('Falha ao autenticar com o mongodb'); 
    console.log(error); 
    return; 
}
console.log('Conexão com mongodb estável'); 
})

mongoose.Promise = global.Promise; 

export default mongoose; 