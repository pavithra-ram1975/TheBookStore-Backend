const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoute");
const orderRoute=require("./routes/orderRoute")
const cartRoutes=require("./routes/cartroutes")
const mongoose = require("mongoose");
const cors = require("cors")

app.use(express.json());


app.use(cors());
mongoose
  .connect(
    // "mongodb+srv://pavithraramasamy2005:Malupavi@cluster0.7euqobi.mongodb.net/TheBook")
   
  // "mongodb+srv://pavithraram:Malupavi@cluster0.siwxvc5.mongodb.net/TheBookStore"
  "mongodb://localhost:27017/Book")
  
// )
  .then(() => {
    console.log("Connected to db");
  });

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/order",orderRoute)
app.use("/cart",cartRoutes);
app.listen(2525, () => {
  console.log("Server running on port 2525");
});
 