import React, { useState, useEffect } from "react";
import FormCategories from "../../Components/FormCategories";
import { Container, Grid } from "@mui/material";

function Vform() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <FormCategories service="vehicle" />
      </Container>
    </div>
  );
}

export default Vform;
