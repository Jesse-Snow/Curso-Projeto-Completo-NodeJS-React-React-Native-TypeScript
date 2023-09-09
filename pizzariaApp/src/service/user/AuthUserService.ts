import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest){
        
        // Verifica se email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });
        if(!user){
            throw new Error('User/Password is incorrect.');
        }

        // Verificar se senha está correta
        const passwordMatch = await compare(password,user.password);

        if(!passwordMatch){
            throw new Error('User/Password is incorrect.');
        }

        // Se passou por validações acima, gerar token para o usuário
        
        // Função sign -> primeiro parâmetro: Payload, segundo parâmetro: secret key
        // terceiro parâmetro: opções de quando irá expirar o token, subject ( whom the token refers to)
        /* A secret key virá de uma variável de ambiente 
           -- ( forma mais segura, pois .env por padrão 
                não são commitadas para o repositório 
                local. ) 
        */
       const token = sign( { 
          name: user.name, 
          email: user.email
        }, 
        // Usando a keyword 'as' para que o typescript considere que será uma string e não será undefined
         process.env.JWT_SECRET as string, 
         {
            subject: user.id,
            expiresIn: '30d'
         }
       ) 


        return {
            id: user.id,
            name: user.name, 
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService };