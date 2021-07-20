import { useAppState } from '../state'

export type ProfileProps = {}

export const Profile = () => {
  const { user } = useAppState()

  if (!user) return null

  const { address, balance, ownedTokens } = user

  return (
      <div>
          <h1>Profile</h1>
      </div>
  )
}