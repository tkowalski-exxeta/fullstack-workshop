import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { client } from "../gql/client";
import { LoginDocument } from "../gql/graphql-operations";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  username: z.string().min(4, { message: "Der Username muss mindestens 4 Zeichen lang sein" }),
  password: z.string().min(4),
});
type LoginData = z.infer<typeof schema>;

export const Login: React.FC = () => {
  const usernameId = useId();
  const navigate = useNavigate();
  const passId = useId();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  function login(data: LoginData) {
    return client
      .request(LoginDocument, {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        if (res.login) {
          const { token, ...user } = res.login;
          window.localStorage.setItem("id_token", token);
          window.localStorage.setItem("user", JSON.stringify(user));
          navigate("/admin");
        }
      });
  }

  return (
    <div className="login-container">
      <div className="login-paper">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit(login)}>
          <div className="input-group">
            <label htmlFor={usernameId}>Username</label>
            <input id={usernameId} type="text" {...register("username")} />
            {errors.username?.message && <div className="error-msg">{errors.username?.message}</div>}
          </div>

          <div className="input-group">
            <label htmlFor={passId}>Password</label>
            <input id={passId} type="password" {...register("password")} />
            {errors.password?.message && <div className="error-msg">{errors.password?.message}</div>}
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
