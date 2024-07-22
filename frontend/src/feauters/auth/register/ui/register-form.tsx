import { Button } from "@nextui-org/react"
import { Select, SelectItem } from "@nextui-org/react"
import { Input } from "@nextui-org/input"
import { Formik } from "formik"
import * as Yup from "yup"
import { useAuth } from "@/shared/hooks/use-auth"
import { Role } from "@/shared/types"
import PasswordInput from "@/shared/ui/password-input"
import PhoneInput from "./compose/phone-input"

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Имя обязательно для заполнения")
    .min(2, "Имя должно быть больше двух букв"),
  phone: Yup.string().nullable().min(5, "Имя должно быть больше двух букв"),
  email: Yup.string()
    .email("Введите корректный email адрес")
    .required("Email обязятелен для заполнения")
    .min(5, "Минимальная длинна email - 5 символов")
    .max(32, "Максимальная длинна пароля - 32 символа"),
  password: Yup.string()
    .required("Пароль обязятелен для заполнения")
    .min(6, "Минимальная длинна пароля - 6 символов")
    .max(32, "Максимальная длинна пароля - 32 символа"),
  role: Yup.string().required("Выберите роль"),
})

export const RegisterForm = () => {
  const { register } = useAuth()

  return (
    <Formik
      initialValues={{
        phone: null,
        name: "",
        email: "",
        password: "",
        role: Role.USER,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        register(values.phone, values.name, values.email, values.password, values.role)

        resetForm()
      }}
    >
      {({ errors, values, handleChange, handleBlur, handleSubmit }) => (
        <form className="flex max-w-sm flex-col gap-2" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-2">
            <Input
              variant="bordered"
              size="lg"
              type="text"
              name="name"
              label="Имя"
              placeholder="Сотрудник"
              onChange={handleChange}
              value={values.name}
            />

            <PhoneInput values={values} handleChange={handleChange} handleBlur={handleBlur} />

            <Input
              variant="bordered"
              size="lg"
              type="email"
              name="email"
              label="Email"
              placeholder="you@mail.com"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            <PasswordInput
              variant="bordered"
              size="lg"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />

            <Select
              variant="bordered"
              size="lg"
              name="role"
              label="Должность"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.role}
            >
              {Object.values(Role).map((role) => (
                <SelectItem key={role}>
                  {role === Role.ADMIN
                    ? "Администратор"
                    : role === Role.ELECTRICAL_ENGINEER
                      ? "Инженер-электрик"
                      : role === Role.ENERGY_ENGINEER
                        ? "Инженер-электрик"
                        : "Пользователь"}
                </SelectItem>
              ))}
            </Select>
          </div>

          <span className="px-1 text-base font-normal text-danger">
            {errors.name || errors.phone || errors.email || errors.password || errors.role}
          </span>

          <Button className="font-medium" variant="shadow" color="primary" size="lg" type="submit">
            Зарегистрировать
          </Button>
        </form>
      )}
    </Formik>
  )
}
