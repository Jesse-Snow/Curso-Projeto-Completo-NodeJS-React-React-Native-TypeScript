// Com o export default, o nome que eu importar aqui pode ser qualquer um, pois o default será o que exportei no prisma/index.ts
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

// Criar usuário no banco de Dados
class CreateUserService {
    async execute({name,email,password} : UserRequest){
        
        // Valida se preencheu o email
        if(!email){
            throw new Error("Email incorrect!");
        }


        // Validar se email já foi cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });
        if (userAlreadyExists){
            throw new Error("User already exists!");
        }
        

        // Criar usuário
        
        // -- Criptografar senha
        const passwordHash = await hash(password,8);
        const user = await prismaClient.user.create({
            // data é o que irá definir
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            // O select é o que vai retornar
            select:{
                id:true,
                name:true,
                email:true
            }
        })

        return user;
    }
}

export { CreateUserService };