import { kebabCase } from 'lodash'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Toast, toastTypes } from '../components/Toast'
import { clear as clearToast, push as pushToast, remove as removeToast } from '../state/zoo/actions'

// Toasts
const useToast = function () {
  const dispatch = useDispatch()
  const helpers = useMemo(() => {
    const push = (toast: Toast) => dispatch<any>(pushToast(toast))

    return {
      toastError: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.DANGER, title, description })
      },
      toastInfo: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.INFO, title, description })
      },
      toastSuccess: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.SUCCESS, title, description })
      },
      toastWarning: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.WARNING, title, description })
      },
      push,
      remove: (id: string) => dispatch<any>(removeToast(id)),
      clear: () => dispatch<any>(clearToast()),
    }
  }, [dispatch])

  return helpers
}

export default useToast
