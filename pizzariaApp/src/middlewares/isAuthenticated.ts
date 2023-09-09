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

    // Método verify irá validar o token e retornar as informações do token ( nesse caso: name,email,iat,exp,sub)
    try {
        const { sub } = verify(
            token,
            process.env.JWT_SECRET as string
        ) as PayLoad;
        
        // Atribuindo ao parametro user_id da requisição, o subject do token
          // Adicionado parâmetro na interface Request do Express no src/@types/express.index.d.ts
        req.user_id = sub;

        return next();

    }catch(err){
        return res.status(401).end();
    }

}