import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    // const interval = setInterval(() => {
    //   console.log("interval");
    // }, 1000);
    // This is unmounting phase
    // Below method is called when the component is unmounted
    // This is the place where we clear our interval
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  return (
    <div>
      <h1>Contact Us Page</h1>
    </div>
  );
};

export default Contact;
