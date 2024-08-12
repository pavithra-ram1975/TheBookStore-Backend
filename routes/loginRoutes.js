const express=require("express")
const router=express.Router()
const  Signincontroller=require("../controllers/signinController")


router.post("/",Signincontroller.login)

module.exports=router;