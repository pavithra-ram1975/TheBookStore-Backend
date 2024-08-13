const Ordercontroller = require("../controllers/orderController")
const express = require("express")
const auth=require("../middlewares/auth")
const router = express.Router();

router.post("/",auth,Ordercontroller.placeOrder)
router.get("/",Ordercontroller.getOrders)

module.exports=router;