import UserClass from "./UserClass";
import React from "react";
import UserContext from "../utils/UserContext";

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
        <UserContext.Consumer>
          {({ loggedInUser }) => (
            <h1 className="font-bold m-2">{loggedInUser}</h1>
          )}
        </UserContext.Consumer>
        <h1>About Us Page</h1>
        <UserClass name={"First"} location={"Navi Mumbai"} />
      </div>
    );
  }
}

export default About;
