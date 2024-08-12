const express=require("express")
const router=express.Router()
const Cartcontroller=require("../controller/Cartcontroller")
const auth=require("../middleware/auth")

router.post("/",auth,Cartcontroller.postcart)
router.get("/",auth,Cartcontroller.getcart)
router.delete("/:product_id",auth,Cartcontroller.removefromcart)

module.exports=router;