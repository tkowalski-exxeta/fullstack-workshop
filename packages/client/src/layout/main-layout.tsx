import { Outlet } from "react-router-dom"

export const MainLayout: React.FC = () => {
  return (
    <section>
      <header>Questionnaier-App</header>
      <main>
        <Outlet />
      </main>
      <footer>2023 Exxeta</footer>
    </section>
  )
}
