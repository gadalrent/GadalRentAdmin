import React from "react";
import Products from "../../Components/Products";

function MunApproved() {
  return (
    <div>
      {" "}
      <Products isApproved={false} service={"Machinery"} />
    </div>
  );
}

export default MunApproved;
