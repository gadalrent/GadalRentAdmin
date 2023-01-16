import React from "react";
import FormCategories from "../../Components/FormCategories";
import { Container, Grid } from "@mui/material";
function Mform() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <FormCategories service="Machinery" />
    </Container>
  );
}

export default Mform;
