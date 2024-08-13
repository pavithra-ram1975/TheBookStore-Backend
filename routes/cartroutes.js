const express=require("express")
const router=express.Router()
const Cartcontroller=require("../controllers/cartController")
const auth=require("../middlewares/auth")

router.post("/",auth,Cartcontroller.postcart)
router.get("/",Cartcontroller.getcart)
router.delete("/:product_id",auth,Cartcontroller.removefromcart)

module.exports=router;