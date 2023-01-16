import React, { useState, useEffect } from "react";
import Products from "../../Components/Products";

function PunApproved() {
  return (
    <div>
      <Products isApproved={false} service="property" />
    </div>
  );
}

export default PunApproved;
