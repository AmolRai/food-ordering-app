import UserClass from "./UserClass";
import React from "react";
import { UserClass2 } from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
    // console.log("Parent Constructor");
  }

  componentDidMount() {
    // console.log("Parent componentDidMount");
  }

  render() {
    // console.log("Parent Render");

    return (
      <div>
        <h1>About Us Page</h1>
        <UserClass name={"First"} location={"Navi Mumbai"} />
      </div>
    );
  }
}

export default About;
