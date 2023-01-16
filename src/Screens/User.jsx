import React from "react";
import { Container, Grid } from "@mui/material";
import UsersList from "../Components/usersList";
// import { Outlet } from "react-router-dom";

function User() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid item xs={12}>
          <UsersList />
        </Grid>
      </Container>
    </div>
  );
}

export default User;
