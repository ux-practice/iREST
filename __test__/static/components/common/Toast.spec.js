import { notifyError, notifySuccess } from '../../../../src/static/components/common/Toast'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

describe('notifyError', () => {
    it('should display an error toast message', () => {
      const errorMessage = 'Something went wrong!'
      const toastErrorSpy = jest.spyOn(toast, 'error')
      notifyError(errorMessage)
      expect(toastErrorSpy).toHaveBeenCalledWith(errorMessage)
    })
})

  
  describe('notifySuccess', () => {
    it('should display a success toast message', () => {
      const successMessage = 'Successful!'
      const toastSuccessSpy = jest.spyOn(toast, 'success')
      notifySuccess(successMessage)
      expect(toastSuccessSpy).toHaveBeenCalledWith(successMessage)
    })
  })
  
