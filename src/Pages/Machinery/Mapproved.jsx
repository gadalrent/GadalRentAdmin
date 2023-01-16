import React from "react";
import Products from "../../Components/Products";

function Mapproved() {
  return (
    <div>
      <div>
        <Products isApproved={true} service="Machinery" />
      </div>
    </div>
  );
}

export default Mapproved;
