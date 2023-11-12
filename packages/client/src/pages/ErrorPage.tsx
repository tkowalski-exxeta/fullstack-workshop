import React from "react";
import { Link, useRouteError } from "react-router-dom";

export const ErrorPage: React.FC = () => {
  const error = useRouteError();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <div className="error-message">
        <p>Sorry, an unexpected error has occurred.</p>
        {error instanceof Error && (
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        )}
      </div>
      <Link className="button " to="/">
        Go Back
      </Link>
    </div>
  );
};
