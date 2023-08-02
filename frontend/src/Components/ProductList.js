import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./CSS/ViewModal.css";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        ShopNow
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function ProductList() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [modalName, setModalName] = useState("");
  const [modalPrice, setModalPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products",{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    console.log(result)
    if (result) {
      alert("Product is deleted Successfully");
      getProducts();
    }
  };

  const handleSearch = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      setProducts(result);
    } else {
      getProducts();
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
            alignItems: "center",
            textAlign: "center",
            alignContent: "center",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Product
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Welcome to ShopNow
            </Typography>
            <TextField
              onChange={handleSearch}
              sx={{ width: { sm: "20ch", md: "30ch", lg: "35ch", xl: "45ch" } }}
              id="search-bar"
              className="text"
              label="Enter your product detail"
              variant="outlined"
              placeholder="Search..."
              size="small"
            />
          </Container>
        </Box>
        <Container sx={{ py: 8  }} maxWidth="md" >
          <Grid container    spacing={4}>
            {products.length > 0 ? (
              products.slice(0).reverse().map((card) => (
                <Grid item  key={card.name} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: "100%",
                        width: "80%",
                      }}
                      image={card.imageURL}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5">
                        {card.name}
                      </Typography>
                      <Typography
                        sx={{ color: "#dc143c" }}
                        gutterBottom
                        variant="h6"
                      >
                        {card.price}
                        {" $"}
                      </Typography>
                      <Typography>{card.company}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        title="View"
                        sx={{
                          color: "white",
                          bgcolor: "#1976d2",
                          ":hover": { color: "white", bgcolor: "#00bfff" },
                        }}
                        size="small"
                        onClick={() => {
                          setOpen(true);
                          setModalName(card.name);
                          setModalPrice(card.price);
                        }}
                      >
                        <RemoveRedEye titleAccess="View" />
                      </Button>
                      <Button
                        title="Delete"
                        sx={{
                          color: "white",
                          bgcolor: "#C70039",
                          ":hover": { color: "white", bgcolor: "#FF3333" },
                        }}
                        size="small"
                        onClick={() => deleteProduct(card._id)}
                      >
                        <Delete titleAccess="Delete" />
                      </Button>
                      <Button
                        title="Edit"
                        sx={{
                          bgcolor: "#65a765",
                          ":hover": { bgcolor: "#90EE90" },
                        }}
                        size="small"
                        onClick={() => navigate("/update/" + card._id)}
                      >
                        <Edit sx={{ color: "white" }} titleAccess="Edit" />
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography  variant="h6" sx={{ color: "red" ,}}>
                No Product Found
              </Typography>
            )}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          ShopNow
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          🤗Thanks for visiting🤗
        </Typography>
        <Copyright />
      </Box>
      <>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          center
          classNames={{
            overlayAnimationIn: "customEnterOverlayAnimation",
            overlayAnimationOut: "customLeaveOverlayAnimation",
            modalAnimationIn: "customEnterModalAnimation",
            modalAnimationOut: "customLeaveModalAnimation",
          }}
          animationDuration={800}
        >
          <CardContent sx={{ flexGrow: 1, p: 5 }}>
            <Typography gutterBottom variant="h5">
              {modalName}
            </Typography>
            <Typography sx={{ color: "#dc143c" }} gutterBottom variant="h6">
              {modalPrice}
              {" $"}
            </Typography>
          </CardContent>
        </Modal>
      </>
    </ThemeProvider>
  );
}

export default ProductList;
