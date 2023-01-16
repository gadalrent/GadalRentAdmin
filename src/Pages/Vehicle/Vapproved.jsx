import React from "react";
import Products from "../../Components/Products";

function Vapproved() {
  return (
    <div>
      <Products isApproved={true} service="Vehicle" />
    </div>
  );
}

export default Vapproved;
