import {Router } from 'express';

// Info - 2 ( Named Export)
import { CreateUserController } from './controller/user/CreateUserController';
import { AuthUserController } from './controller/user/AuthUserController';

const router = Router();

// User Routes
router.post('/users', new CreateUserController().handle);

// Infos - 1 ( Chamadas de função com e sem parênteses )
router.post('/session', new AuthUserController().handle)

export { router }; 