import React from "react";
import FormDropDown from "../../Components/FormDropDown";
import { Container } from "@mui/material";

function MformList() {
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <FormDropDown />
      </Container>
    </div>
  );
}

export default MformList;
