import express from 'express'; 
import morgan from 'morgan';
import AdminRouter from './controller/admin';
import UserRouter from './controller/user';
import { autenticacaoMiddleware } from './middlewares/autenticacao';


export class App {
    public app: express.Application; 
    private port = 3000; 

    constructor(){
    this.app = express(); 
     this.middlewares(); 
     this.routes(); 
    }
    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }
    private routes (){
        this.app.use('/user', UserRouter);
        this.app.use('/admin',autenticacaoMiddleware, AdminRouter); 
    }
    async listen(): Promise<void> {
        await this.app.listen(this.port, () => {
            console.log ('Servidor Conectado')
        }); 
    }
}