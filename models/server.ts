import express, {Application} from "express";
import cors from 'cors';
import mutationRoutes from '../routes/mutationRoutes';
import { dbPostgres } from "../configs/connection";

class Server {
    private app:Application;
    private port:string;
    private apiPaths ={
        mutation: '/mutation',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.middlewares();
        this.routes();
        this.dbConnection();
    }

    async dbConnection() {
        try {
            await dbPostgres.authenticate();
            console.log('Database postgres online');
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares(){
        //Cors
        this.app.use(cors())

        //parseo del body
        this.app.use(express.json())
        // Directorio Público
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use(this.apiPaths.mutation, mutationRoutes )
    }


    listen(){
        this.app.listen(this.port, () =>{
            console.log('servidor corriendo en '+ this.port)
        })
    }

}
export default Server;
