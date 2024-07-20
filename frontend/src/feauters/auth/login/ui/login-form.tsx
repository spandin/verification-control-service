import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Formik } from "formik"
import * as Yup from "yup"
import { useAuth } from "@/shared/hooks/use-auth"
import PasswordInput from "@/shared/ui/password-input"
import { SITE_CONFIG } from "@/shared/config/site"
import { PopoverTrigger, PopoverContent, Popover } from "@nextui-org/react"

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Введите корректный email адрес.")
    .required("Email обязятелен для заполнения.")
    .min(5, "Минимальная длинна email - 5 символов.")
    .max(32, "Максимальная длинна пароля - 32 символа."),
  password: Yup.string()
    .required("Пароль обязятелен для заполнения.")
    .min(6, "Минимальная длинна пароля - 6 символов.")
    .max(32, "Максимальная длинна пароля - 32 символа."),
})

export const LoginForm = () => {
  const { login } = useAuth()

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        login(values.email, values.password)

        resetForm()
      }}
    >
      {({ errors, values, handleChange, handleBlur, handleSubmit }) => (
        <form className="flex w-full max-w-sm flex-col gap-2" onSubmit={handleSubmit} noValidate>
          <div className="mb-4 flex flex-col items-start justify-start px-1">
            <div className="flex flex-row items-center justify-start gap-3">
              <div className="h-4 w-4 rotate-45 bg-warning" />
              <h1 className="text-2xl font-semibold text-slate-800">{SITE_CONFIG.description}</h1>
            </div>

            <h3 className="text-md font-semibold text-slate-500">
              система контроля поверки ГУ "ЦОДБО"
            </h3>
          </div>

          <div className="flex flex-col gap-2">
            <Input
              variant="bordered"
              size="lg"
              type="email"
              name="email"
              label="Email"
              placeholder="you@mail.com"
              onChange={handleChange}
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
          </div>

          <span className="text-md px-1 font-medium text-danger">
            {errors.email || errors.password}
          </span>

          <Button className="font-medium" variant="shadow" color="primary" size="lg" type="submit">
            Войти
          </Button>

          <Popover
            showArrow
            backdrop="blur"
            placement="bottom"
            classNames={{
              base: ["before:bg-default-200"],
              content: [
                "py-3 px-4 border border-default-200 max-w-sm",
                "bg-gradient-to-br from-white to-default-300",
                "dark:from-default-100 dark:to-default-50",
              ],
            }}
          >
            <PopoverTrigger>
              <Button className="font-semibold" variant="light" size="lg">
                Помощь
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              {(titleProps) => (
                <div className="px-1 py-2">
                  <h3 className="text-base font-semibold" {...titleProps}>
                    Как войти?
                  </h3>
                  <div className="text-md">
                    Обратитесь к управляющим, возможно ваши данные для входа уже высланы на ваш
                    Email
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </form>
      )}
    </Formik>
  )
}
