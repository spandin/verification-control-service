import { LoginForm } from "@/feauters/auth/login"

const LoginWidget = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6">
      <LoginForm />
    </div>
  )
}

export default LoginWidget
