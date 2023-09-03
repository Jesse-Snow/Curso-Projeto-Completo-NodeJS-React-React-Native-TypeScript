import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

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


        return {status: 'ok'}
    }
}

export { AuthUserService };