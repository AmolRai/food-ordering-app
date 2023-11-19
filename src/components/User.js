import { useState } from "react";

const User = (props) => {
  return (
    <div className="user">
      <h3>Location: Navi Mumbai</h3>
      <h3>Type: {props.name}</h3>
      <h4>Twitter: @amolrai_dev</h4>
    </div>
  );
};

export default User;
