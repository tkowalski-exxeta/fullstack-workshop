import { Outlet } from "react-router-dom";
import "./main-layout.css";

export const MainLayout: React.FC = () => {
  return (
    <section className="layout">
      <main>
        <Outlet />
      </main>

      <footer className="footer">&copy; 2023 Exxeta</footer>
    </section>
  );
};
