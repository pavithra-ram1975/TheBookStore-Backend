const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoute");
const mongoose = require("mongoose");
const cors = require("cors")

mongoose
  .connect(
    "mongodb+srv://pavithraramasamy2005:Malupavi%401975@cluster0.7euqobi.mongodb.net/Book")
  .then(() => {
    console.log("Connected to db");
  });

app.use(express.json());
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use(cors())
app.listen(2525, () => {
  console.log("Server running on port 2525");
});
 