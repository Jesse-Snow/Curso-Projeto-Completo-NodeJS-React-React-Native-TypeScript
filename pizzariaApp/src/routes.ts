import {Router } from 'express';


// Middlewares
import isAuthenticated from './middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from './config/multer'

// Info - 2 ( Named Export)
import { CreateUserController } from './controller/user/CreateUserController';
import { AuthUserController } from './controller/user/AuthUserController';
import { DetailUserController } from './controller/user/DetailUserController';
import { CreateCategoryController } from './controller/category/CreateCategoryController';
import { ListCategoryController } from './controller/category/ListCategoryController';
import { CreateProductController } from './controller/product/CreateProductController';
import { ListByCategoryController } from './controller/product/ListByCategoryController';
import { CreateOrderController } from './controller/order/CreateOrderController';
import { DeleteOrderController } from './controller/order/DeleteOrderController';
import { AddOrderItemController } from './controller/order/orderItem/AddOrderItemController';
import { DeleteOrderItemController } from './controller/order/orderItem/DeleteOrderItemController';
import { SendOrderController } from './controller/order/SendOrderController';
import { ListOrdersController } from './controller/order/ListOrdersController';
import { DetailOrderController } from './controller/order/DetailOrderController';

const router = Router();
const upload = multer(uploadConfig.upload('./tmp'));

// User Routes
router.post('/users', new CreateUserController().handle);
// Infos - 1 ( Chamadas de função com e sem parênteses )
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated ,new DetailUserController().handle)


// Category Routes
router.post('/category',isAuthenticated , new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle)

// Product Routes

// Middlewaer upload.single('CampoDaRequisição')
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);

// Order Routes
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new DeleteOrderController().handle);
  // Order Item Route
router.post('/order/add', isAuthenticated, new AddOrderItemController().handle);
router.delete('/order/remove', isAuthenticated, new DeleteOrderItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.get('/orders',isAuthenticated, new ListOrdersController().handle);
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);

export { router }; 