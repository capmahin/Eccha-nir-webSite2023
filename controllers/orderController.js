import slugify from "slugify";
import orderModel from "../models/orderModel";
import categoryModel from '../models/categoryModel.js'
import fs from 'fs';

export const createOrderController = async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name required'})
            
            case !description:
                return res.status(500).send({error:'Description required'})
            case !price:
                return res.status(500).send({error:'Price required'})
            case !category:
                return res.status(500).send({error:'Category required'})
            case !quantity:
                return res.status(500).send({error:'Quantity required'})
                case photo && photo.size > 5000000:
                    return res
                      .status(500)
                      .send({ error: "photo is Required and should be less then 1mb" });
        }
        const products = new productModel({...req.fields, slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:'Product Created Successfully',
            products,
        });
    } catch (error) {
        console.log(error)
        res.send(500).send({
            success:false,
            message:'Error in Create Product',
            error,
        })
    }
};

//getProductController

export const getProductController = async(req,res)=>{
    try {
        const products = await productModel.find({}).populate("category").select("-photo").limit(20).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            countTotal:products.length,
            message:'All Products',
            
            products,
           
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get products',
            error,
        })
    }
};

//getSingleProductController

export const getSingleProductController = async(req,res)=>{
    try {
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success:true,
            message:'Single product fetched',
            product,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get single products',
            error,
        })
    }
};

//get productPhotoController

export const productPhotoController = async(req,res)=>{
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get photo',
            error,
        })
    }
};

//deleteProductController

export const deleteProductController = async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success:true,
            message:'Successfully Product Deleted',
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while deleting product',
            error,
        })
    }
};

//updateProductController

export const updateProductController = async(req,res)=>{
    try {
        const {name,slug,email,phone,bkash,category,quantity,shipping, address, currieraddress, size} = req.fields;
        const {photo} = req.files;
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name required'})
            
            case !email:
                return res.status(500).send({error:'email required'})
            case !phone:
                return res.status(500).send({error:'phone required'})
            case !bkash:
                return res.status(500).send({error:'bkash required'})
            case !category:
                return res.status(500).send({error:'Category required'})
            case !quantity:
                return res.status(500).send({error:'Quantity required'})
            case !address:
                return res.status(500).send({error:'address required'})
            case !currieraddress:
                return res.status(500).send({error:'currieraddress required'})
            case !size:
                return res.status(500).send({error:'size required'})
                case photo && photo.size > 5000000:
                    return res
                      .status(500)
                      .send({ error: "photo is Required and should be less then 1mb" });
        }
        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
          );
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:'Product Updated Successfully',
            products,
        });
    } catch (error) {
        console.log(error)
        res.send(500).send({
            success:false,
            message:'Error in Update Product',
            error,
        })
    }
};

