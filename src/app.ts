import express from 'express'; 
import morgan from 'morgan';

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
    }
    async listen(): Promise<void> {
        await this.app.listen(this.port); 
    }
}