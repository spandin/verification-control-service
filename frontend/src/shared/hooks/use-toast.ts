import { AxiosError } from "axios"
import { ToastOptions, toast } from "react-toastify"

export const useToasts = () => {
  const settingsToast: ToastOptions = {
    position: "top-center",
    autoClose: 2500,
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

  const handleSuccess = (description: string) => {
    toast.success(description, settingsToast)
  }

  const handleInfo = (description: string) => {
    toast.info(description, settingsToast)
  }

  const handleWarning = (description: string) => {
    toast.warning(description, settingsToast)
  }

  const handlePromise = <T>(
    promise: Promise<T>,
    onSuccess: (response?: T) => void,
    onError: (response?: T) => void,
  ) => {
    toast.promise(promise, { pending: "Подождите" }, settingsToast)

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
