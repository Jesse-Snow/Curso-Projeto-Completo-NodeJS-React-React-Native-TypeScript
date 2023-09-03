import { Request,Response} from 'express';
import { CreateUserService } from '../../service/user/CreateUserService';

class CreateUserController {
    async handle( req : Request,res : Response) { 
        const { name, email, password } = req.body;
        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name
            ,email,
            password
        });
        
        return res.json(user);
    }
}

// Essa sintax de { CreateUserController }, é o mesmo que: export {CreateUserController as CreateUserController};
// O 'as', seria um alias
export { CreateUserController };