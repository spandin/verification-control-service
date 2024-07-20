import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { EyeOff, Eye } from "lucide-react"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"

export const LoginForm = () => {
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
      // Отправка данных на сервер для входа
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Logged in:", data)
      } else {
        console.error("Failed to login")
      }
    },
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Input
          type="email"
          variant="bordered"
          label="Email"
          placeholder="you@mail.com"
          className="max-w-xs"
        />
        <Input
          label="Пороль"
          variant="bordered"
          placeholder="Пороль"
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
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
        />

        <Button type="submit" color="primary">
          Войти
        </Button>
      </form>
    </div>
  )
}
