import { LoginForm } from "@/feauters/auth/login"
import { RegisterForm } from "@/feauters/auth/register"

export default function IndexPage() {
  return (
    <div>
      <LoginForm /> <RegisterForm />
    </div>
  )
}
