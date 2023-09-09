import {Router } from 'express';
import isAuthenticated from './middlewares/isAuthenticated';

// Info - 2 ( Named Export)
import { CreateUserController } from './controller/user/CreateUserController';
import { AuthUserController } from './controller/user/AuthUserController';
import { DetailUserController } from './controller/user/DetailUserController';
import { CreateCategoryController } from './controller/category/CreateCategoryController';
import { ListCategoryController } from './controller/category/ListCategoryController';
import { CreateProductController } from './controller/product/CreateProductController';

const router = Router();

// User Routes
router.post('/users', new CreateUserController().handle);
// Infos - 1 ( Chamadas de função com e sem parênteses )
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated ,new DetailUserController().handle)


// Category Routes
router.post('/category',isAuthenticated , new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle)

// Product Routes
router.post('/product', isAuthenticated, new CreateProductController().handle);


export { router }; 