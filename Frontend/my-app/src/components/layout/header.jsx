import { SidebarTrigger } from "../ui/sidebar"

export function Header() {
  return (
    <header className="h-16 border-b flex items-center px-4">
      <SidebarTrigger className="mr-4" />
      <h1 className="text-xl font-semibold">Exam Management System</h1>
    </header>
  )
}
