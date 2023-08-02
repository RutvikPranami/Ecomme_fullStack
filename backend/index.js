const express = require("express");
require("./db/config");
const User = require("./db/user");
const Product = require("./db/Product");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();
const jwtKey = process.env.key;

app.use(express.json());

app.post("/register", async (req, resp) => {
  let user = User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwtKey,  (err, token) => {
    if (err) {
      resp.send({ result: " Something went wrong Please after sometimes!" });
    } else {
      resp.send({ result, auth: token });
    }
  });
});

app.post("/signin", async (req, resp) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      jwt.sign({ user }, jwtKey,  (err, token) => {
        if (err) {
          resp.send({
            result: " Something went wrong Please after sometimes!",
          });
        } else {
          resp.send({ user, auth: token });
        }
      });
    } else {
      resp.send({ result: " User Not found" });
    }
  } else {
    resp.send({ result: " User Not found" });
  }
});


app.get("/user-details/:id" , async(req,resp)=>{
  let user = await User.findOne({_id: req.params.id});
  if(user)
  {
    resp.send(user);
  }else{
    resp.send({result:"No user Found!"})
  }
})

app.post("/add-product", verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", verifyToken, async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Products found" });
  }
});

app.delete("/product/:id", verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found" });
  }
});
app.get("/product/:id", verifyToken, async (req, resp) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found" });
  }
});

app.put("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found" });
  }
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found" });
  }
});

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please Provide valid token!" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token with Headers!" });
  }
}

app.listen(5000);
