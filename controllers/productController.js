const Product = require("../models/productModel");
const { v4:uuidv4 } = require("uuid");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
    console.log(req);
  } catch (err) {
    console.log(err);
  }
};

exports.addProducts = async (req, res) => {
  try {
    const { title, description, price, category, rating, image } = req.body;
    const newProduct = new Product({
      id: uuidv4(),
      title,
      description,
      price,
      category,
      rating,
      image,
    });
    await newProduct.save();
    res.send(newProduct);
  } catch (err) {
    console.log(err);
  }
};
exports.deleteproduct=async(req,res)=>{
  try{
  await product.deleteOne({id:req.body.id}).then(()=>{
      res.send(200).json("success")
      
  })

  }catch(e){
      console.log(e)
  }
 
}