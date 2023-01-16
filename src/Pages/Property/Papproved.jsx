import React from "react";
import Products from "../../Components/Products";

function Papproved() {
  return (
    <div>
      <Products isApproved={true} service="property" />
    </div>
  );
}

export default Papproved;
