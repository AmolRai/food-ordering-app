import { useState } from "react";

const User = (props) => {
  const [count] = useState(0);
  const [count2] = useState(1);

  return (
    <div className="user">
      <h1>Count: {count}</h1>
      <h1>Count2: {count2}</h1>
      <h2>Amol Rai</h2>
      <h3>Location: Navi Mumbai</h3>
      <h3>Type: {props.name}</h3>
      <h4>Twitter: @amolrai_dev</h4>
    </div>
  );
};

export default User;
