
// const Cart =require("../models/cartModel");
//  exports.createCart = async (req,res)=>{
//     const {user_id} = req.user;
//     const{product_id,quantity}= req.body;

//     let {cart} = await Cart.findOne({user_id});
//     if(!cart)
//         {
//         const newcart = new Cart({
//             user_id,
//             products:[
//                 {
//                     product_id,
//                     quantity,
//                 },
//             ],
//         })
//         // await newcart.save();
//         // return res
//         // .status(201)
//         // .json({message:"Cart created"});
//     }
//     else{
//     const ProductIndex = cart.products.findIndex(
//         (prod) => prod.product_id === product_id
//     );
//     if(!ProductIndex > -1){
//         cart.products.push({product_id,quantity});
//     }
//     else{
//         cart.products[ProductIndex].quantity = quantity;
//     }
    
//     const ExistingProduct= cart.product.find
//     (
//         (prod) => prod.product_id === product_id
//     );
// }
// cart.save();
// res.status(200).json({message:"Product created/updated"})
//     if(!ExistingProduct){
//         const newProduct = cart.products;
//         newProduct.push({product_id,quantity});
//         // const newCart = Cart({
//         //     user_id,
//         //     products:newProduct,
//         // });
//         // await newCart.save();
//         await Cart.findByIdAndUpdate({user_id},{products:newProducts});
//         return res
//         .status(201)
//         .json({message:"Product added to cart"});
//     }
//     else
//     {
//         await Cart.findOneandUpdate({user_id},{quantity});
//         return res
//         .status(201)
//         .json({message:"quantity updated"});
//     }
//  }

const express=require("express")
const cartModel=require("../models/cartModel")

// exports.postcart=async (req,res)=>{
//     const {userid} =req.user.userid;
//     const { product_id, quantity } = req.body;
    
//     const user=await cartmodel.findOne({userid})
//     if(!user){
//         const newuser=new cartmodel({
//             userid,
//             products:[{
//                 productid:req.body.productid,
//                 quantity:req.body.quantity
//             }],
//         })

//         await newuser.save()
//         res.json("cart created")
//     }else{
//         const existingproduct=user.products.find((product)=>product.productid===req.body.productid)
//         if(existingproduct){
//             existingproduct.quantity+=req.body.quantity;
//         }else{
//             const newproducts=user.products
//             newproducts.push({
//                 productid:req.body.productid,
//                 quantity:req.body.quantity
//             })
//         }
//         user.save()
//         res.json("cart updated")
//     }
// }
exports.postcart = async (req, res) => {
    const { userid } = req.user; // Assuming req.user contains user information
    const { product_id, quantity } = req.body;
  
    try {
      let userCart = await cartModel.findOne({ userid });
  
      if (!userCart) {
        // Create a new cart if it doesn't exist
        const newCart = new cartModel({
          userid,
          products: [
            {
              product_id,
              quantity,
            },
          ],
        });
        await newCart.save();
        return res.status(201).json("Cart created");
      } else {
        // Update existing cart
        const existingProduct = userCart.products.find(
          (product) => product.product_id === product_id
        );
  
        if (existingProduct) {
          existingProduct.quantity += quantity; // Update quantity
        } else {
          userCart.products.push({
            product_id,
            quantity,
          });
        }
  
        await userCart.save();
        return res.status(200).json("Cart updated");
      }
    } catch (err) {
      console.error("Error updating cart:", err);
      return res.status(500).json("Server Error");
    }
  };


exports.getcart=async(req,res)=>{
    const userid=req.user.userid;
    const usercart=await cartmodel.findOne({userid})
    console.log(usercart);
    if(!usercart){
        return res.status(200).json("cart not found")
    }else{
        const cartitems=usercart.products
        if(!cartitems){
            res.json("Cart is empty")
        }else{
            res.json(cartitems);
        }
    }
}

exports.removefromcart=async(req,res)=>{
    const userid=req.user.userid;
    const {productId} = req.body;
    const userCart=await cartModel.findOne({userid})
    if(!userCart){
        return res.status(404).json("cart not found")
    }else{
        const cartitems=userCart.products;
        if(!cartitems){
            res.status(200).json("No items in cart")
        }
        else{
            const updatedCartitems=cartitems.filter((product)=>productId!=product.productId)
            userCart.products = updatedCartitems;
            await userCart.save();
            res.status(200).json("item removed from cart")
        }

    }
}