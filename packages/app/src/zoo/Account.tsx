import React, { FC } from 'react'
import Typography from '../components/Typography'
import { useActiveWeb3React } from '../hooks/useActiveWeb3React'
import { useLingui } from '@lingui/react'
import useENSName from '../hooks/useENSName'
import { shortenAddress } from 'functions'

interface AccountProps {
  label?: string
  account?: string
  //   ENSName?: string
}

const Account: FC<AccountProps> = ({ label, account: overrideAccount }) => {
  const { i18n } = useLingui()
  const { chainId, account: activeAccount, connector } = useActiveWeb3React()

  const account = overrideAccount || activeAccount
  const { ENSName } = useENSName(account ?? undefined)

  return (
    <div className='flex flex-col justify-center space-y-3'>
      {ENSName ? (
        <div className='bg-dark-800'>
          <Typography>
            {label} {ENSName}
          </Typography>
        </div>
      ) : (
        <div className='py-2'>
          <div className='flex items-center gap-2 space-x-3'>
            <Typography>
              {label} {account && shortenAddress(account)}
            </Typography>
            {/* {chainId && account && (
              <ExternalLink
                color="blue"
                startIcon={<LinkIcon size={16} />}
                href={chainId && getExplorerLink(chainId, ENSName || account, 'address')}
              >
                <Typography variant="sm">{i18n._(t`View on explorer`)}</Typography>
              </ExternalLink>
            )}
            {account && (
              <Copy toCopy={account}>
                <Typography variant="sm">{i18n._(t`Copy Address`)}</Typography>
              </Copy>
            )} */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Account
