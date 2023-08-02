import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import TextField from "@mui/material/TextField";
const defaultTheme = createTheme();

function UserProfile() {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async (event) => {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch(`http://localhost:5000/user-details/${userId}`);
    result = await result.json();
    console.log(result);
    if (result) {
      setUserDetails(result);
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
              {"Hey "} {userDetails.fname}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Welcome back
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 5 }} maxWidth="md">
          <Grid >
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent >
                  <Typography gutterBottom variant="h6">First Name:{" "}{userDetails.fname}</Typography>
                  <Typography gutterBottom variant="h6">Last Name:{" "}{userDetails.lname}</Typography>
                  <Typography gutterBottom variant="h6">Email:{" "}{userDetails.email}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default UserProfile;
