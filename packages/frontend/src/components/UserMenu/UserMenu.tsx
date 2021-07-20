import { css, cx } from '@emotion/css'
import { useHistory } from 'react-router'
import { EtherSymbol } from '@ethersproject/constants'
import { useAppState } from '../../state'
import { Identicon } from '..'
import { toShort } from '../../utils'

export type UserMenuProps = {
  //
}


const style = css`
flex: auto;
`
const UserMenu = () => {
  const { user, isAuthenticated } = useAppState()

  const history = useHistory()

  return (
    <div className={style}>
      <h1>User menu</h1>
    </div>
  )
}

export { UserMenu }
