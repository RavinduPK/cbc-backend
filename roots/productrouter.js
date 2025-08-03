import express from 'express';
import productController from '../controller/productController.js';

import { get } from 'mongoose';


const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/",createProduct);
productRouter.delete("/:productID", deleteProduct);
productRouter.put("/:productID", updateProduct);
productRouter.get("/:productID", getProductById);

export default productRouter;