import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./CSS/Nav.css";
import { useNavigate } from "react-router-dom";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userAuth = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <>
      {userAuth ? (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <ShoppingCart
                sx={{ display: { xs: "none", md: "flex" }, color: "black" }}
              />
              <Typography
                variant="h4"
                href="/"
                noWrap
                component="a"
                sx={{
                  mr: 5,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "yellowgreen",
                }}
              >
                ShopNow
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to="/" className="stg-link">
                        Product
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to="/add" className="stg-link">
                        Add Product
                      </Link>
                    </Typography>
                  </MenuItem>

                </Menu>
              </Box>
              <ShoppingCart
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "yellowgreen",
                  textDecoration: "none",
                }}
              >
                ShopNow
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  href="/"
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "lightGray",
                    display: "block",
                    fontSize: "x-large",
                    ml: 2,
                    fontWeight: "bold",
                  }}
                >
                  Product
                </Button>
                <Button
                  href="/add"
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "lightGray",
                    display: "block",
                    fontSize: "x-large",
                    ml: 2,
                    fontWeight: "bold",
                  }}
                >
                  Add Product
                </Button>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="UserImage" src="" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/user_profile" className="stg-link">
                        Profile
                      </Link>
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        to="/signin"
                        className="stg-link"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <ShoppingCart
                sx={{ display: { md: "flex" }, color: "black" }}
              />
              <Typography
                variant="h4"
                href="/"
                noWrap
                component="a"
                sx={{
                  mr: 5,
                  display: {  md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "yellowgreen",
                }}
              >
                ShopNow
              </Typography>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {" "}
                <MenuItem>
                  <Typography textAlign="center">
                    <Link to="/signup" className="stg-link">
                      SignUp
                    </Link>
                  </Typography>
                </MenuItem>
              </Menu>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
}
export default ResponsiveAppBar;
