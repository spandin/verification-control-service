import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { EyeOff, Eye } from "lucide-react"
import { useState } from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

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
  const [isVisible, setIsVisible] = useState(false)

  const handleSubmit = async (values: { email: string; password: string }) => {
    console.log(values.email, values.password)
  }

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form noValidate>
            <FormControl id="email" isInvalid={!!errors.email && touched.email}>
              <FormLabel>Email:</FormLabel>
              <Field
                name="email"
                as={Input}
                type="email"
                placeholder={"example@email.com"}
              />
            </FormControl>

            <FormControl
              id="password"
              isInvalid={!!errors.password && touched.password}
            >
              <FormLabel>Пароль:</FormLabel>
              <Field name="password" as={PasswordInput} />
            </FormControl>

            <p className="color-danger w-full text-sm">
              {errors.email || errors.password}
            </p>

            <Button
              mt={1}
              variant={"solidDark"}
              type={"submit"}
              isLoading={isLoading}
              loadingText={"Вход"}
            >
              Войти
            </Button>
          </Form>
        )}
      </Formik>
      <div>
        <Input
          type="email"
          variant="bordered"
          label="Email"
          placeholder="you@mail.com"
          className="max-w-xs"
        />

        <Input
          label="Password"
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

        <Button color="primary" onPress={onClose}>
          Войти
        </Button>
      </div>
    </div>
  )
}
