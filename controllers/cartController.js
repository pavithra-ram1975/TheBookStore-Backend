
const express=require("express")
const cartModel=require("../models/cartModel")
const cors=require("cors")

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

app.use(cors())
exports.postcart = async (req, res) => {
    const { userid } = req.user.userid; 
    const { product_id, quantity } = req.body;
  
    try {
      let userCart = await cartModel.findOne({ userid });
  
      if (!userCart) {
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
    const usercart=await cartModel.findOne({userid})
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