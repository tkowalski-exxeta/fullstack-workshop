import "./MainLayout.css";

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="app">
      <section className="layout">
        {children}
        <footer className="footer">&copy; 2023 Exxeta</footer>
      </section>
    </div>
  );
};
