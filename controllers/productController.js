import productModel from "../models/productModel.js";
import fs from 'fs';

export const createProductController = async(req,res)=>{
    try {
        const products = await productModel
    } catch (error) {
        console.log(error)
        res.send(500).send({
            success:false,
            message:'Error in Create Product',
            error,
        })
    }
}