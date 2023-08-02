import React ,{useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Edit } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useParams , useNavigate } from "react-router-dom";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState(false);
  const [pricrError, setPriceError] = useState(false);
  const param = useParams();
  const navigate = useNavigate();




  useEffect(()=>{
  
    
      getProductsDetails();
    
  },[])

  const getProductsDetails = async()=>{
      let result = await fetch(`http://localhost:5000/product/${param.id}`,{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);
      setImageURL(result.imageURL);   
  }


  const handleSubmit = async () => {
    const numberErr = /^[0-9\b]+$/;

    if (!name || !price || !imageURL || !category || !company) {
      setError(true);
      return false;
    }
    if (!numberErr.test(price)) {
      setPriceError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`http://localhost:5000/product/${param.id}`, {
      method: "put",
      body: JSON.stringify({
        name,
        price,
        imageURL,
        category,
        company,
        userId,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    console.log(result);
    setName("");
    setPrice("");
    setImageURL("");
    setCategory("");
    setCompany("");
    alert("Product Updated successfully");
    navigate("/");
  };

  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1 },
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "#65a765" }}>
        <Edit titleAccess="Update Product" />
      </Avatar>
      <Typography component="h1" variant="h5">
        Update Product
      </Typography>

      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: { sm: "20ch", md: "30ch", lg: "35ch", xl: "45ch" },
          },
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="name"
          id="fullWidth"
          autoComplete="off"
        />
        {error && !name && (
          <Typography variant="h7" sx={{ color: "red" }}>
            Enter valid name
          </Typography>
        )}
        <TextField
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          label="price"
          id="fullWidth"
          autoComplete="off"
        />
        {error && !price && (
          <Typography variant="h7" sx={{ color: "red" }}>
            Enter valid price
          </Typography>
        )}
        {pricrError && (
          <Typography variant="h7" sx={{ color: "red" }}>
            Please enter numeric value
          </Typography>
        )}
        <TextField
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          label="Image URL"
          id="fullWidth"
          autoComplete="off"
        />
        {error && !imageURL && (
          <Typography variant="h7" sx={{ color: "red" }}>
            Enter valid Image URL
          </Typography>
        )}
        <TextField
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="category"
          id="fullWidth"
          autoComplete="off"
        />
        {error && !category && (
          <Typography variant="h7" sx={{ color: "red" }}>
            Enter valid category
          </Typography>
        )}
        <TextField
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          label="company"
          id="fullWidth"
          autoComplete="off"
        />
        {error && !company && (
          <Typography variant="h7" sx={{ color: "red" }}>
            Enter valid company
          </Typography>
        )}
        <Button
          onClick={handleSubmit}
          type="button"
          sx={{
            mt: 3,
            mb: 2,
            color: "white",
            bgcolor: "success.main",
            ":hover": { color: "white", bgcolor: "black" },
          }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
}

export default UpdateProduct;
