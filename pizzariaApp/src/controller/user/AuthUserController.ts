import { Request,Response } from "express";
import { AuthUserService } from "../../service/user/AuthUserService";


class AuthUserController {
    async handle(req: Request,res: Response){
        const { email, password } = req.body;
        const auth = await new AuthUserService().execute({
            email,
            password
        });

       

        return res.json(auth);
    }
}

export { AuthUserController };