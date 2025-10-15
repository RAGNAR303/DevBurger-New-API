import { Router } from 'express';
import multer from 'multer';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';
import ProductsController from './app/controllers/ProductsController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';
import adminMiddlewares from './app/middlewares/adminMiddlewares.js';
import authMiddlewares from './app/middlewares/authMiddlewares.js';
import multerConfig from './config/multer.cjs';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares); // => usuario logado

routes.get('/products', ProductsController.index);
routes.get('/categories', CategoryController.index);
routes.post('/order', OrderController.store);
routes.get('/order/', OrderController.index);

routes.use(adminMiddlewares); // => usuario E admin para criar ou editar

routes.post('/products', upload.single('file'), ProductsController.store);
routes.put('/products/:id', upload.single('file'), ProductsController.update);

routes.post('/categories', upload.single('file'), CategoryController.store);
routes.put('/categories/:id', upload.single('file'), CategoryController.update);

routes.put('/order/:id', OrderController.update);

export default routes;
