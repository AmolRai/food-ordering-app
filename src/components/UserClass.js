import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Default Name",
        location: "Default Contact",
      },
      count: 0,
    };
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/amolrai");
    const json = await data.json();
    this.setState({
      userInfo: json,
    });

    // this.interval = setInterval(() => {
    //   console.log("Interval");
    // }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== prevState.count) {
      console.log("count values changes compare to previous state");
    }
  }

  componentWillUnmount() {
    // This method is called when component is unmounted/removed from the web page
    // clearInterval(this.interval);
  }

  render() {
    const { name, bio, avatar_url, twitter_username } = this.state.userInfo;

    return (
      <div className="user">
        <img width={200} src={avatar_url} />
        <h2>Name: {name}</h2>
        <h3>Bio: {bio}</h3>
        <h3>Contact: {twitter_username}</h3>
      </div>
    );
  }
}

export default UserClass;
