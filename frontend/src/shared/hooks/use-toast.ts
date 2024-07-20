import { AxiosError } from "axios"
import { ToastOptions, toast } from "react-toastify"

export const useToasts = () => {
  const settingsToast: ToastOptions = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
  }

  const handleError = (
    error: unknown,
    title: string = "Что-то пошло не так",
  ) => {
    if (error instanceof AxiosError) {
      toast.error(`${title} - ${error}`, settingsToast)
    }

    toast.error(`${title} - ${error}`, settingsToast)
  }

  const handleSuccess = (title: string, description: string) => {
    toast.success(`${title} - ${description}`, settingsToast)
  }

  const handleInfo = (title: string, description: string) => {
    toast.info(`${title} - ${description}`, settingsToast)
  }

  const handleWarning = (title: string, description: string) => {
    toast.warning(`${title} - ${description}`, settingsToast)
  }

  const handlePromise = <T>(
    promise: Promise<T>,
    messages: {
      st?: string
      sd?: string
      et?: string
      ed?: string
      lt?: string
      ld?: string
    },
    onSuccess: (response?: T) => void,
    onError: (response?: T) => void,
  ) => {
    toast.promise(
      promise,
      {
        success: `${messages.st || "Успешно"} - ${messages.sd || "Ваши данные отправлены на сервер."}`,
        error: `${messages.et || "Ошибка"} - ${messages.ed || ""}`,
        pending: `${messages.lt || "Подождите"} - ${messages.ld || "Идет отправка запроса."}`,
      },
      settingsToast,
    )

    promise
      .then((response) => {
        onSuccess(response)
      })
      .catch((err) => {
        onError(err)
      })
  }

  return {
    handleError,
    handleSuccess,
    handleInfo,
    handleWarning,
    handlePromise,
  }
}
