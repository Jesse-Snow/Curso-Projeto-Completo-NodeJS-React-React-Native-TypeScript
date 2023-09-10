import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // Recomendado usar como segundo import
import cors from 'cors';
import path from 'path';

import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

// Middleware para ter acesso aos arquivos estáticos da pasta tmp
// Info 4
app.use( '/files', express.static(path.resolve(__dirname,'..','tmp')));


// Midleware para tratamento de erros.
// Se faz uso dos quatro parâmetros (err,req,res,next)
app.use((err: Error,req : Request, res:Response, next: NextFunction) => {

    // Caso seja uma instância da Classe Error
    if( err instanceof Error){
        return res.status(500).json({
            error: err.message
        });
    }

    // Caso não seja uma instância da Classe Error
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
});

app.listen(3333, ()=> { console.log('Server running at port: 3333')});