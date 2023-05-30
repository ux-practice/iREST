import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

export const notifyError = errorMessage => {
  toast.error(errorMessage)
}

export const notifySuccess = successMessage => {
  toast.success(successMessage)
}
