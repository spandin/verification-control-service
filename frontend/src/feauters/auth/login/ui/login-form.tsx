import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { EyeOff, Eye } from "lucide-react"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAuth } from "@/shared/hooks/use-auth"

export const LoginForm = () => {
  const { login } = useAuth()
  const [isVisible, setIsVisible] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Введите корректный email адрес.")
        .required("Email обязятелен для заполнения.")
        .min(5, "Минимальная длинна email - 5 символов.")
        .max(32, "Максимальная длинна пароля - 32 символа."),
      password: Yup.string()
        .required("Пароль обязятелен для заполнения.")
        .min(6, "Минимальная длинна пароля - 6 символов.")
        .max(32, "Максимальная длинна пароля - 32 символа."),
    }),

    onSubmit: async (values) => {
      login(values.email, values.password)
    },
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Input
          className="max-w-xs"
          variant="bordered"
          type="email"
          name="email"
          label="Email"
          placeholder="you@mail.com"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Input
          className="max-w-xs"
          variant="bordered"
          type={isVisible ? "text" : "password"}
          name="password"
          label="Пороль"
          placeholder="Пороль"
          onChange={formik.handleChange}
          value={formik.values.password}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeOff className="pointer-events-none text-2xl text-default-400" />
              ) : (
                <Eye className="pointer-events-none text-2xl text-default-400" />
              )}
            </button>
          }
        />

        <Button type="submit" color="primary">
          Войти
        </Button>
      </form>
    </div>
  )
}
