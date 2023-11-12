import { useMutation } from "@apollo/client";
import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { graphql } from "../gql";

const LoginDocument = graphql(/* GraphQL */ `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      _id
      name
      token
    }
  }
`);

type LoginData = {
  username: string;
  password: string;
};

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const usernameId = useId();
  const passId = useId();
  const [doLogin] = useMutation(LoginDocument);

  function login(data: LoginData) {
    return doLogin({
      variables: {
        username: data.username,
        password: data.password,
      },
      onCompleted: (data) => {
        console.log("login data", data);
        if (data.login) {
          const { token, ...user } = data.login;
          window.localStorage.setItem("id_token", token);
          window.localStorage.setItem("user", JSON.stringify(user));
          navigate("/admin");
        }
      },
    });
  }

  return (
    <div className="login-container">
      <div className="login-paper">
        <h1>Login</h1>
        <form
          className="login-form"
          onSubmit={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            const { username, password } = document.forms[0];
            login({
              username: username.value,
              password: password.value,
            });
          }}
        >
          <div className="input-group">
            <label htmlFor={usernameId}>Username</label>
            <input id={usernameId} type="text" name="username" />
          </div>

          <div className="input-group">
            <label htmlFor={passId}>Password</label>
            <input id={passId} type="password" name="password" />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
