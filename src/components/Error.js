import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h2>
        Oops went wrong!!!
        {error.status} {error?.statusText}
      </h2>
      <h3>{error?.data}</h3>
    </div>
  );
};

export default Error;
