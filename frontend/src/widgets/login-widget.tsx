import { LoginForm } from "@/feauters/auth/login"
import { ThemeSwitcher } from "@/shared/ui/theme-switcher"

const LoginWidget = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6">
      <ThemeSwitcher />
      <LoginForm />
    </div>
  )
}

export default LoginWidget
