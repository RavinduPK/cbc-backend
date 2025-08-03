import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

 export async function createProduct(req, res) {

if(!isAdmin(req)) {
        return res.status(403).json({
            message: "Access denied. Admins only."
        });
    }

    try{
        const productData = req.body;
        const product = new Product(productData);
        await product.save();

        res.json({
            message : "Product created successfully",
            product: product,
        })
    } catch (error) {
        res.status(500).json({
            message: "Error creating product",
            error: error.message
        });
    }
 }

 export async function getAllProducts(req, res) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message
        });
    }
 }

 export async function deleteProduct(req, res) {
 
    if(!isAdmin(req)) {
        return res.status(403).json({
            message: "Access denied. Admins only."
        });
    }




 try{
    const productId = req.params.productID; // Assuming productID is passed as a URL parameter

    await Product.deleteOne({ productID: productId });
    res.json({
        message: "Product deleted successfully"
    });

 }catch (error) {
    res.status(500).json({
        message: "Error deleting product",
        error: error.message
    });
 }



}


export async function updateProduct(req,res){
    if(!isAdmin(req)) {
        return res.status(403).json({
            message: "Access denied. Admins only."
        });
    }

    try{
       
        const productID = req.params.productID; // Assuming productID is passed as a URL parameter

        const updatedData = req.body;

        await Product.updateOne({ productID: productID }, updatedData);
        res.json({
            message: "Product updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating product",
            error: error.message
        });
    }




}








export async function getProductById(req, res) {
    try {
        const productId = req.params.productID; // Assuming productID is passed as a URL parameter
        const product = await Product.findOne({ productID: productId });
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }else {
             res.json(product);
        }
       
    } catch (error) {
        res.status(500).json({
            message: "Error fetching product",
            error: error.message
        });
    }
}