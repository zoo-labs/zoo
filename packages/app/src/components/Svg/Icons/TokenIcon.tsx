
import React from 'react'
import useDynamicSVGImport, { UseDynamicSVGImportOptions } from '../../../hooks/useDynamicsSVGImport';
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints';
import { ZAP } from './TokenIcons';

export interface TokenIconProps {
  name: string;
  onCompleted?: UseDynamicSVGImportOptions["onCompleted"];
  onError?: UseDynamicSVGImportOptions["onError"];
}

const Icon: React.FC<TokenIconProps | any> = ({ name, onCompleted, onError, ...rest }) => {
  const { error, loading, SvgIcon } = useDynamicSVGImport(name, {
    onCompleted,
    onError
  });
  const { isXs, isSm } = useMatchBreakpoints()
  const mobile = isXs || isSm
  if (error) {
    return <ZAP height={mobile ? 22 : 38} width={mobile ? 22 : 38} />;
  }
  if (loading) {
    return <div>...</div>;
  }
  if (SvgIcon) {
    return <SvgIcon {...rest} />;
  }
  return <ZAP height={mobile ? 22 : 38} width={mobile ? 22 : 38} />;
}

export default Icon