import { useHistory, useLocation } from 'react-router'
import { useAppState } from '../../state'
import { UserMenu } from '..'

export type HeaderProps = {
  //
}

export const Header = () => {
//   const history = useHistory()
//   const location = useLocation()

  const { user, isAuthenticated } = useAppState()

  return (
    <div>
        Header
    </div>
  )
}

