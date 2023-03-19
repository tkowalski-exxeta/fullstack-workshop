import { Outlet } from "react-router-dom"

export const MainLayout: React.FC = () => {
  return (
    <section className="h-full flex flex-col">
      <header className="bg-blue-900 block text-blue-50 p-4 text-xl">
        Questionnaier-App
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-gray-50 p-4">
        &copy; 2023 Exxeta
      </footer>
    </section>
  )
}
