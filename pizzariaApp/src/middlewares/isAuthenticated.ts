import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
    sub: string;
}

export default function( req: Request,res: Response, next: NextFunction){
    
    // Receber token
    const authToken = req.headers.authorization;

    if(!authToken){ 
        return res.status(401).end();
    }

    // Separando a requisição para que não venha o prefixo, apenas o token da requisição 
    const[,token] = authToken.split(" ");

    // Método verify irá validar o token e retornar as informações do token ( nesse caso: id,name,email,iat,exp,sub)
    try {
        const { sub } = verify(
            token,
            process.env.JWT_SECRET as string
        ) as PayLoad;
        console.log( sub );

        return next();

    }catch(err){
        return res.status(401).end();
    }

}