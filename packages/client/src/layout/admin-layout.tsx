import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";
import "./main-layout.css";
import ArrowBackPath from "./icons/arrow_back.svg";
import LogoutPath from "./icons/logout.svg";

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const onAdmin = useMatch("/admin");

  function logout() {
    window.localStorage.removeItem("id_token");
    window.localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <>
      <header className="header">
        {!onAdmin && (
          <Link className="link" to="/admin">
            <img src={ArrowBackPath} title="back" width={24} height={24} />
          </Link>
        )}
        <h1>Forms-App</h1>
        <div onClick={logout}>
          <img src={LogoutPath} title="logout" width={24} height={24} />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
