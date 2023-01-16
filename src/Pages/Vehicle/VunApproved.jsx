import React, { useState, useEffect } from "react";
import Products from "../../Components/Products";

function VunApproved() {
  return (
    <div>
      <Products isApproved={false} service="vehicle" />
    </div>
  );
}

export default VunApproved;
