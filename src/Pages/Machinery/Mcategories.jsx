import React from "react";
import Categories from "../../Components/Categories";
import { Container } from "@mui/material";

function Mcategories() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Categories service="Machinery" />
      </Container>
    </div>
  );
}

export default Mcategories;
