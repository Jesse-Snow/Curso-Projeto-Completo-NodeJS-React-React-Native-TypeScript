import {Router } from 'express';
// É usado o {} quando é um export nomeado, ou seja, que tem um alias
import { CreateUserController } from './controller/user/CreateUserController';

const router = Router();

// User Routes
router.post('/users', new CreateUserController().handle);

export { router }; 