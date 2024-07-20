import { LoginForm } from "@/feauters/auth/login"
import { useAuth } from "@/shared/hooks/use-auth"
import { Navbar } from "@/widgets/navbar"

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuth()

  if (!isAuth) {
    return (
      <div className="flex h-screen flex-col items-center justify-center px-6">
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="bg-backgroud flex h-screen flex-col-reverse text-foreground md:flex-row">
      <Navbar />
      <main className="container max-w-4xl flex-grow border-r-slate-200 p-6 md:border-r-2">
        {children}
      </main>
    </div>
  )
}
