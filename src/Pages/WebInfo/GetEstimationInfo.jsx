import React from "react";
import Products from "../../Components/Products";

function GetEstimationInfo() {
  return (
    <div>
      <div>
        <Products isApproved={false} service="estimation" />
      </div>
    </div>
  );
}

export default GetEstimationInfo;
