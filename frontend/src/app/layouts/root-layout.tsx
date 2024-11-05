import { useAuth } from "@/shared/hooks/use-auth"
import LoginWidget from "@/widgets/login-widget"
import Navbar from "@/widgets/navbar"

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuth()

  if (!isAuth) {
    return <LoginWidget />
  }

  return (
    <div className="container m-0 mx-auto flex max-h-screen max-w-4xl flex-col-reverse gap-4 text-foreground md:flex-col">
      <Navbar />
      <main className="scroll-container flex-grow overflow-hidden overflow-y-auto rounded-t-3xl bg-white p-6">
        {children}
      </main>
    </div>
  )
}
