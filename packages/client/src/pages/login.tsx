import { useId } from "react"
import { client } from "../gql/client"
import { LoginDocument } from "../gql/graphql-operations"
import { useNavigate } from "react-router-dom"

type LoginData = {
  username: string
  password: string
}

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const usernameId = useId()
  const passId = useId()

  function login(data: LoginData) {
    return client
      .request(LoginDocument, {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        if (res.login) {
          const { token, ...user } = res.login
          window.localStorage.setItem("id_token", token)
          window.localStorage.setItem("user", JSON.stringify(user))
          navigate("/admin")
        }
      })
  }

  return (
    <div className="login-container">
      <div className="login-paper">
        <h1>Login</h1>
        <form
          className="login-form"
          onSubmit={(ev) => {
            ev.preventDefault()
            ev.stopPropagation()
            console.log("onSubmit", ev)
            const { username, password } = document.forms[0]
            login({
              username: username.value,
              password: password.value,
            })
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
  )
}
