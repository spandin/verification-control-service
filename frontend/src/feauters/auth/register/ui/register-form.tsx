import { Button } from "@nextui-org/button"
import { Select, SelectItem } from "@nextui-org/react"
import { Input } from "@nextui-org/input"
import { EyeOff, Eye } from "lucide-react"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useAuth } from "@/shared/hooks/use-auth"
import { Role } from "@/shared/types"

export const RegisterForm = () => {
  const { register } = useAuth()
  const [isVisible, setIsVisible] = useState(false)

  const formik = useFormik({
    initialValues: {
      phone: null,
      name: "",
      email: "",
      password: "",
      role: Role.USER,
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Имя обязательно для заполнения.")
        .min(2, "Имя должно быть больше двух букв."),
      email: Yup.string()
        .email("Введите корректный email адрес.")
        .required("Email обязятелен для заполнения.")
        .min(5, "Минимальная длинна email - 5 символов.")
        .max(32, "Максимальная длинна пароля - 32 символа."),
      password: Yup.string()
        .required("Пароль обязятелен для заполнения.")
        .min(6, "Минимальная длинна пароля - 6 символов.")
        .max(32, "Максимальная длинна пароля - 32 символа."),
      role: Yup.string().required("Выберите роль"),
    }),

    onSubmit: async (values) => {
      register(
        values.phone,
        values.name,
        values.email,
        values.password,
        values.role,
      )

      console.log("values", values)
    },
  })

  return (
    <div>
      <form
        className="flex max-w-xs flex-col gap-1"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <Input
          className="max-w-xs"
          variant="bordered"
          type="text"
          name="name"
          label="Имя"
          placeholder="Введите имя"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

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

        <Select
          className="max-w-xs"
          variant="bordered"
          name="role"
          label="Выберите роль"
          onChange={formik.handleChange}
          value={formik.values.role}
        >
          {Object.values(Role).map((role) => (
            <SelectItem key={role}>{role}</SelectItem>
          ))}
        </Select>

        <Button type="submit" color="primary">
          Войти
        </Button>
      </form>
    </div>
  )
}
