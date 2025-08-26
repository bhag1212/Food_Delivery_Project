import express from 'express'
import { addToCart,decreaseFromCart,getCart} from '../controllers/cartContoller.js'
import authMiddleware from '../middleware/auth.js';
const cartRouter=express.Router();

cartRouter.post('/add',authMiddleware,addToCart);
cartRouter.put('/decrease',authMiddleware,decreaseFromCart);
cartRouter.post('/get',authMiddleware,getCart);


export default cartRouter;