import * as React from "react";
import Categories from "../../Components/Categories";
import { Container } from "@mui/material";

function Pcategories() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Categories service="Property" />
    </Container>
  );
}

export default Pcategories;
