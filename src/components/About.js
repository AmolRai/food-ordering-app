import React, { useEffect, useState } from "react";
import { GITHUB_API } from "../utils/constants";
import Shimmer from "./Shimmer";

const About = () => {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    const data = await fetch(GITHUB_API);
    const json = await data.json();
    setUserInfo(json);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (userInfo === null) {
    return <Shimmer />;
  }

  const { avatar_url } = userInfo;

  return (
    <div className="user">
      <div>
        <img src={avatar_url} />
        <div className="profiles">
          <img
            onClick={() => window.open("https://twitter.com/amolrai_dev")}
            src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png"
          />
          <img
            onClick={() =>
              window.open("https://www.linkedin.com/in/amolrai07/")
            }
            src="https://cdn-icons-png.flaticon.com/128/145/145807.png"
          />
          <img
            onClick={() => window.open("https://leetcode.com/amolrai/")}
            src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
          />
          <img
            onClick={() => window.open("https://medium.com/@amolrai3")}
            src="https://cdn-icons-png.flaticon.com/128/3670/3670068.png"
          />
          <img
            onClick={() => window.open("https://github.com/amolrai")}
            src="https://cdn-icons-png.flaticon.com/128/733/733553.png"
          />
          <img
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1ujEyZ3o4hqk7NQR4virnishroDMsO2-B/view"
              )
            }
            src="https://cdn-icons-png.flaticon.com/128/3135/3135692.png"
          />
        </div>
      </div>
      <div className="user-info">
        <h1 className="font-medium text-4xl text-gray-600">AMOL RAI</h1>
        <h1 className="mt-3 text-gray-500">
          Experienced Frontend Developer from India
        </h1>
        <h1 className="mt-5 text-gray-800">
          Frontend Developer with 1+ years of experience who is comfortable
          working with HTML, CSS, JavaScript, TypeScript, ReactJS, NextJS, Redux
          and responsive web design to deliver exceptional customer experience.
        </h1>
        <p className="text-gray-800">
          I have written a number of articles on various programming-related
          topics. These articles have been well-received, garnering over 60,000
          views from readers around the world.
        </p>
        <p className="text-gray-800">
          I have developed a strong foundation in problem-solving through
          consistent practice, including solving over 500+ data structure and
          algorithm problems on LeetCode and other platforms.
        </p>
        <p
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            color: "blue",
          }}
        >
          <a href="https://github.com/AmolRai/namaste-react">
            Project Repository Link
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
