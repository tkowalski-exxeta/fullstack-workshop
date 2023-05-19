import "./main-layout.css"

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="app">
      <section className="layout">
        <header className="header">
          <a className="link" href="/">
            Forms-App
          </a>
        </header>
        <main>{children}</main>
        <footer className="footer">&copy; 2023 Exxeta</footer>
      </section>
    </div>
  )
}