import { Formik } from "formik"
import * as Yup from "yup"
import { useAuth } from "@/shared/hooks/use-auth"
import PasswordInput from "@/shared/ui/password-input"
import { SITE_CONFIG } from "@/shared/config/site"
import HelpButton from "./compose/help-button"
import { Button, Input, Spacer } from "@nextui-org/react"

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Введите корректный email адрес")
    .required("Email обязятелен для заполнения")
    .min(5, "Минимальная длинна email - 5 символов")
    .max(32, "Максимальная длинна пароля - 32 символа"),
  password: Yup.string()
    .required("Пароль обязятелен для заполнения")
    .min(6, "Минимальная длинна пароля - 6 символов")
    .max(32, "Максимальная длинна пароля - 32 символа"),
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
          <div className="flex flex-row items-center justify-start gap-2">
            <img className="max-w-6" src="/favicon.svg" />
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              {SITE_CONFIG.description}
            </h3>
          </div>

          <Spacer />

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

          <span className="px-1 text-base font-normal text-danger">
            {errors.email || errors.password}
          </span>

          <Button className="font-medium" variant="shadow" color="primary" size="lg" type="submit">
            Войти
          </Button>

          <HelpButton />
        </form>
      )}
    </Formik>
  )
}
